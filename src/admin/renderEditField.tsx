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
  if (
    Array.isArray(value) ||
    (typeof value === "object" && isAccordion(path))
  ) {
    return (
      <div className="mb-8 space-y-4">
        {value.map((item, index) => (
          <div key={index} className="relative rounded-lg bg-white p-4 shadow">
            {Object.entries(item).map(([key, val]) => (
              <div key={key} className="mb-4">
                <label className="mb-2 block text-sm font-medium capitalize">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </label>
                {typeof val === "string" && isImageField(`${path}.${key}`) ? (
                  <ImageUpload
                    currentSrc={val}
                    onUpload={(url) => {
                      const newArray = [...value];
                      newArray[index] = { ...item, [key]: url };
                      handleEdit(path, newArray);
                    }}
                    path={`${path}.${key}`}
                  />
                ) : (
                  <textarea
                    value={val as string}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = { ...item, [key]: e.target.value };
                      handleEdit(path, newArray);
                    }}
                    className="focus:ring-blue-500 min-h-[100px] w-full rounded-lg border p-3 focus:ring-2"
                  />
                )}
              </div>
            ))}
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

  if (typeof value === "object") {
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
            {typeof val === "string" && isImageField(`${path}.${key}`) ? (
              <ImageUpload
                currentSrc={val}
                onUpload={(url) => handleEdit(`${path}.${key}`, url)}
                path={`${path}.${key}`}
              />
            ) : (
              renderEditField(`${path}.${key}`, val, handleEdit, depth + 1)
            )}
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
              {typeof val === "string" && isImageField(`${path}.${key}`) ? (
                <ImageUpload
                  currentSrc={val}
                  onUpload={(url) => handleEdit(`${path}.${key}`, url)}
                  path={`${path}.${key}`}
                />
              ) : (
                renderEditField(`${path}.${key}`, val, handleEdit, depth + 1)
              )}
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
          className="focus:ring-blue-500 min-h-[100px] w-full rounded-lg border p-3 focus:ring-2"
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

function isAccordion(fieldPath: string) {
  console.log("fieldPath", fieldPath);
  const pathParts = fieldPath.split(".");
  const lastPart = pathParts[pathParts.length - 1]!.toLowerCase();
  return lastPart === "accordion" || lastPart === "accordionitems";
}
