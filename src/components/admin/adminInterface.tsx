import React, { useState, useEffect } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import content from "~/content.json";

// Assuming you have a type definition for your JSON structure
type JsonData = any; // Replace 'any' with your actual type

const AdminInterface: React.FC = () => {
  const [jsonData, setJsonData] = useState<JsonData>(content);
  const [activePage, setActivePage] = useState<string>("landing");
  const [editingField, setEditingField] = useState<string | null>(null);

  // Use when data is on the server, but for now just import it from client JSON file
  // useEffect(() => {
  //   // Fetch your JSON data here
  //   const fetchData = async () => {
  //     const response = await fetch('/api/data')
  //     const data = await response.json()
  //     setJsonData(data)
  //   }
  //   fetchData()
  // }, [])

  const handleEdit = (key: string, value: string) => {
    setJsonData((prevData: JsonData) => ({
      ...prevData,
      [key]: value,
    }));
    setEditingField(key);
    setTimeout(() => setEditingField(null), 100);
  };

  const handleDelete = (key: string, index: number) => {
    setJsonData((prevData: JsonData) => {
      const newData = { ...prevData };
      newData[key].splice(index, 1);
      return newData;
    });
  };

  const handleAdd = (key: string) => {
    setJsonData((prevData: JsonData) => ({
      ...prevData,
      [key]: [
        ...prevData[key],
        { title: "New Item", description: "Description" },
      ],
    }));
  };

  const renderEditField = (key: string, value: any, depth = 0) => {
    if (typeof value === "string") {
      return (
        <motion.div
          key={key}
          animate={editingField === key ? { scale: 1.05 } : { scale: 1 }}
          className="mb-4"
        >
          <label className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          {value.length > 50 ? (
            <Textarea
              value={value}
              onChange={(e) => handleEdit(key, e.target.value)}
              className="mt-1 block w-full"
            />
          ) : (
            <Input
              type="text"
              value={value}
              onChange={(e) => handleEdit(key, e.target.value)}
              className="mt-1 block w-full"
            />
          )}
        </motion.div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {key}
          </label>
          {value.map((item, index) => (
            <div key={index} className="mt-2 flex items-center">
              <Input
                type="text"
                value={JSON.stringify(item)}
                onChange={(e) => {
                  const newValue = [...value];
                  newValue[index] = JSON.parse(e.target.value);
                  // handleEdit(key, newValue)
                }}
                className="flex-grow"
              />
              <Button
                onClick={() => handleDelete(key, index)}
                variant="ghost"
                size="icon"
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAdd(key)}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      );
    } else if (typeof value === "object") {
      return (
        <div
          key={key}
          className="mb-4"
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <h3 className="mb-2 text-lg font-semibold">{key}</h3>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderEditField(`${key}.${subKey}`, subValue, depth + 1),
          )}
        </div>
      );
    }
  };

  return (
      <div className="flex h-screen bg-gray-100">
        <ScrollArea className="w-1/3 bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Edit Content</h2>
          {Object.entries(jsonData).map(([key, value]) =>
            renderEditField(key, value),
          )}
        </ScrollArea>
        <div className="relative w-2/3 bg-gray-200 p-6">
          <h2 className="mb-4 text-2xl font-bold">Preview</h2>
          <div className="relative h-full">
            {Object.keys(jsonData).map((page) => (
              <div
                key={page}
                className="absolute inset-0 overflow-auto rounded-lg bg-white p-4 shadow-lg"
                style={{ zIndex: page === activePage ? 1 : 0 }}
              >
                <h3 className="mb-2 text-xl font-semibold">{page}</h3>
                <pre>{JSON.stringify(jsonData[page], null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default AdminInterface;
