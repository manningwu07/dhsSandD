import { Trash2, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { ImageUpload } from "./imageUpload";

export function renderEditField(
  path: string,
  value: any,
  handleEdit: (path: string, value: any) => void,
  depth = 0,
) {
  if (Array.isArray(value)) {
    return (
      <div className="mb-8 space-y-4">
        {value.map((item, index) => (
          <div key={index} className="relative rounded-lg bg-white p-4 shadow">
            {renderEditField(`${path}.${index}`, item, handleEdit, depth + 1)}
            <Button
              onClick={() => {
                const newArray = value.filter((_, i) => i !== index);
                handleEdit(path, newArray);
              }}
              variant="destructive"
              size="sm"
              className="absolute right-2 top-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          onClick={() => {
            const newItem = { ...value[0] };
            Object.keys(newItem).forEach((key) => {
              if (typeof newItem[key] === "string") newItem[key] = "";
            });
            handleEdit(path, [...value, newItem]);
          }}
          variant="outline"
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>
    );
  }

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={path}>
          <div className="flex">
            <span className="hover:no-underline">
              {Array(depth).fill("\u00A0\u00A0\u00A0").join("")}
            </span>
            <AccordionTrigger className="group text-lg font-medium">
              <span className="capitalize">
                {(() => {
                  const pathParts = path.split(".");
                  const currentPart = pathParts.pop() ?? "Object";
                  // Check if current part is a number
                  if (!isNaN(Number(currentPart))) {
                    const parentPart = pathParts.pop();
                    // If parent ends with 's', remove it and add the number
                    if (parentPart?.endsWith("s")) {
                      return `${parentPart.slice(0, -1)} ${Number(currentPart) + 1}`;
                    } else {
                      const formattedParentPart = parentPart!
                        .replace(/([A-Z])/g, " $1")
                        .trim();

                      return `${formattedParentPart} item ${Number(currentPart) + 1}`;
                    }
                  }
                  return currentPart.split(/(?=[A-Z])/).join(" ");
                })()}
              </span>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <div className="space-y-4">
              {Object.entries(value).map(([key, val]) => (
                <div key={key}>
                  {typeof val === "string" && isImageField(`${path}.${key}`) ? (
                    <ImageUpload
                      currentSrc={val}
                      onUpload={(url) => handleEdit(`${path}.${key}`, url)}
                      path={`${path}.${key}`}
                    />
                  ) : (
                    renderEditField(
                      `${path}.${key}`,
                      val,
                      handleEdit,
                      depth + 1,
                    )
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className="mb-6">
      <label className="mb-2 block text-sm font-medium capitalize">
        {createLabel(path)}
      </label>
      {typeof value === "string" && isImageField(path) ? (
        <ImageUpload
          currentSrc={value}
          onUpload={(url) => handleEdit(path, url)}
          path={path}
        />
      ) : (
        <textarea
          value={value as string}
          onChange={(e) => handleEdit(path, e.target.value)}
          className="min-h-[100px] w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}

function createLabel(path: string) {
  return path
    .split(".")
    .pop()
    ?.split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();
}

function isImageField(fieldPath: string) {
  const pathParts = fieldPath.split(".");
  const lastPart = pathParts[pathParts.length - 1]!.toLowerCase();
  return lastPart === "src" || lastPart === "imagesrc";
}
