"use client";

import { useState, useEffect, useCallback } from "react";
import { Trash2, Plus, Upload } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import content from "~/content.json";
import LandingPage from "~/pages/LandingPage";
import AboutPage from "~/pages/about";
import BoardPage from "~/pages/board";
import ParentsPage from "~/pages/parents";
import TournamentPage from "~/pages/tournament";
import ClubEventsPage from "~/pages/club-events";
import { db } from "~/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AdminInterface() {
  const [data, setData] = useState(content);
  const [activePage, setActivePage] = useState("landing");
  const [sliderPosition, setSliderPosition] = useState(33);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createLabel = (path: string) => {
    return path
      .split(".")
      .pop()
      ?.split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase();
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const setNestedValue = (obj: any, path: string, value: any) => {
    const newObj = { ...obj };
    const parts = path.split(".");
    const last = parts.pop()!;
    const target = parts.reduce((acc, part) => acc[part], newObj);
    target[last] = value;
    return newObj;
  };

  const handleEdit = (path: string, value: any) => {
    setData((prev) => setNestedValue(prev, path, value));
  };

  const handleAddItem = (path: string) => {
    const currentArray = getNestedValue(data, path);
    if (Array.isArray(currentArray)) {
      const newItem = { ...currentArray[0] };
      Object.keys(newItem).forEach((key) => {
        if (typeof newItem[key] === "string") newItem[key] = "";
      });
      handleEdit(path, [...currentArray, newItem]);
    }
  };

  const handleRemoveItem = (path: string, index: number) => {
    const currentArray = getNestedValue(data, path);
    if (Array.isArray(currentArray)) {
      handleEdit(
        path,
        currentArray.filter((_, i) => i !== index),
      );
    }
  };

  const renderEditField = (path: string, value: any, depth = 0) => {
    if (Array.isArray(value)) {
      return (
        <div className="mb-8 space-y-4">
          {value.map((item, index) => (
            <div
              key={index}
              className="relative rounded-lg bg-white p-4 shadow"
            >
              {Object.entries(item).map(([key, val]) => (
                <div key={key} className="mb-4">
                  <label className="mb-2 block text-sm font-medium capitalize">
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </label>
                  <textarea
                    value={val as string}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = { ...item, [key]: e.target.value };
                      handleEdit(path, newArray);
                    }}
                    className="focus:ring-blue-500 min-h-[100px] w-full rounded-lg border p-3 focus:ring-2"
                  />
                </div>
              ))}
              <Button
                onClick={() => handleRemoveItem(path, index)}
                variant="destructive"
                size="sm"
                className="absolute right-2 top-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAddItem(path)}
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      );
    }

    if (typeof value === "object") {
      // Only wrap in accordion if it's a top-level section
      const isTopLevel = depth === 0;
      const content = (
        <div className="space-y-6">
          {Object.entries(value).map(([key, val]) => (
            <div key={key}>
              {!isTopLevel && (
                <h3 className="mb-4 text-lg font-medium capitalize">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </h3>
              )}
              {renderEditField(`${path}.${key}`, val, depth + 1)}
            </div>
          ))}
        </div>
      );

      if (isTopLevel) {
        return Object.entries(value).map(([key, val]) => (
          <Accordion type="single" collapsible key={key}>
            <AccordionItem value={key}>
              <AccordionTrigger className="text-lg font-medium capitalize">
                {key.split(/(?=[A-Z])/).join(" ")}
              </AccordionTrigger>
              <AccordionContent>
                {renderEditField(`${path}.${key}`, val, depth + 1)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ));
      }

      return content;
    }

    return (
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium capitalize">
          {createLabel(path)}
        </label>
        <textarea
          value={value as string}
          onChange={(e) => handleEdit(path, e.target.value)}
          className="focus:ring-blue-500 min-h-[100px] w-full rounded-lg border p-3 focus:ring-2"
        />
      </div>
    );
  };

  const renderPreview = () => {
    switch (activePage) {
      case "landing":
        return <LandingPage content={data} />;
      case "about":
        return <AboutPage content={data} />;
      case "board":
        return <BoardPage content={data} />;
      case "clubEvents":
        return <ClubEventsPage content={data} />;
      case "parents":
        return <ParentsPage content={data} />;
      case "tournament":
        return <TournamentPage content={data} />;
      default:
        return <LandingPage content={data} />;
    }
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = (e.clientX / window.innerWidth) * 100;
        setSliderPosition(Math.max(10, Math.min(90, newPosition)));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const deployToFirebase = async () => {
    setIsDeploying(true);
    try {
      // Reference to the document in Firestore, e.g., 'dhsSpeechAndDebate/content'
      const docRef = doc(db, "dhsSpeechAndDebate", "content");
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // Update the document if it exists
        await setDoc(docRef, {
          components: data.components,
          landing: data.pages.landing,
          about: data.pages.about,
          board: data.pages.board,
          clubEvents: data.pages.clubEvents,
          parents: data.pages.parents,
          tournament: data.pages.tournament,
        }, { merge: true }); // Merge to avoid overwriting fields
      } else {
        // Create a new document if it doesn't exist
        await setDoc(docRef, data);
      }

      alert("Successfully deployed to Firebase Firestore!");
    } catch (error) {
      console.error("Error deploying to Firestore:", error);
      alert("Error deploying to Firebase Firestore");
    } finally {
      setIsDeploying(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="border-b p-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              disabled={isDeploying}
              onClick={() => setIsDialogOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isDeploying ? "Deploying..." : "Deploy to Firebase"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-50">
            <DialogHeader>
              <DialogTitle>Confirm Deployment</DialogTitle>
              <DialogDescription>
                Are you sure you want to deploy these changes? This will update
                the live website immediately.
              </DialogDescription>
            </DialogHeader>
            <Alert>
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This action will make your changes public. Please ensure
                everything looks correct and is ready to deploy.
              </AlertDescription>
            </Alert>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={deployToFirebase}>Deploy</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ScrollArea
          className="border-r"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="space-y-8 p-8">
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {[
                  "landing",
                  "about",
                  "board",
                  "parents",
                  "tournament",
                  "clubEvents",
                ].map((page) => (
                  <Button
                    key={page}
                    onClick={() => setActivePage(page)}
                    variant={activePage === page ? "default" : "outline"}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            {renderEditField(
              `pages.${activePage}`,
              data.pages[activePage as keyof typeof data.pages],
            )}
            {renderEditField("components", data.components)}
          </div>
        </ScrollArea>

        <div
          className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
          onMouseDown={handleMouseDown}
        />

        <div className="bg-white" style={{ width: `${100 - sliderPosition}%` }}>
          <ScrollArea className="h-full">{renderPreview()}</ScrollArea>
        </div>
      </div>
    </div>
  );
}
