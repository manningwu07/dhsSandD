import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { db } from '~/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface EmailManagementDialogProps {
  
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EmailManagementDialog({ isOpen, setIsOpen }: EmailManagementDialogProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    const docRef = doc(db, 'dhsSpeechAndDebate', 'authorizedUsers');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setEmails(data.admin || []);
    }
  };

  const addEmail = async () => {
    if (emailInput && !emails.includes(emailInput)) {
      const docRef = doc(db, 'dhsSpeechAndDebate', 'authorizedUsers');
      await updateDoc(docRef, {
        admin: arrayUnion(emailInput),
      });
      setEmails([...emails, emailInput]);
      setEmailInput('');
    }
  };

  const removeEmail = async (email: string) => {
    const docRef = doc(db, 'dhsSpeechAndDebate', 'authorizedUsers');
    await updateDoc(docRef, {
      admin: arrayRemove(email),
    });
    setEmails(emails.filter((e) => e !== email));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4" onClick={() => setIsOpen(true)}>
          Manage Admin Emails
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50">
        <DialogHeader>
          <DialogTitle>Manage Admin Emails</DialogTitle>
          <DialogDescription>
            Add or remove admin email addresses authorized to access this interface.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter email address"
              className="border rounded p-2 w-full"
            />
            <Button onClick={addEmail} disabled={!emailInput}>
              Add
            </Button>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            {emails.map((email) => (
              <li key={email} className="flex justify-between items-center">
                <span>{email}</span>
                <Button variant="destructive" size="sm" onClick={() => removeEmail(email)}>
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}