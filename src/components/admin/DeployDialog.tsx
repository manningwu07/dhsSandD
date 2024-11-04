import { Button } from '~/components/ui/button';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { db } from '~/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { DataStructure } from '~/utils/dataStructure';

interface DeployDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDeploying: boolean;
  setIsDeploying: (isDeploying: boolean) => void;
  data: DataStructure;
}

export function DeployDialog({ isOpen, setIsOpen, isDeploying, setIsDeploying, data }: DeployDialogProps) {
  const deployToFirebase = async () => {
    setIsDeploying(true);
    try {
      const docRef = doc(db, 'dhsSpeechAndDebate', 'content');
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists() && data) {
        await setDoc(
          docRef,
          {
            components: data.components,
            landing: data.pages.landing,
            about: data.pages.about,
            board: data.pages.board,
            clubEvents: data.pages.clubEvents,
            parents: data.pages.parents,
            tournament: data.pages.tournament,
          },
          { merge: true },
        );
      } else {
        await setDoc(docRef, data);
      }

      alert('Successfully deployed to Firebase Firestore!');
    } catch (error) {
      console.error('Error deploying to Firestore:', error);
      alert('Error deploying to Firebase Firestore');
    } finally {
      setIsDeploying(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={isDeploying} onClick={() => setIsOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          {isDeploying ? 'Deploying...' : 'Deploy Website'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50">
        <DialogHeader>
          <DialogTitle>Confirm Deployment</DialogTitle>
          <DialogDescription>
            Are you sure you want to deploy these changes? This will update the live website immediately.
          </DialogDescription>
        </DialogHeader>
        <Alert>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will make your changes public. Please ensure everything looks correct and is ready to deploy.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={deployToFirebase}>Deploy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}