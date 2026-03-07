"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useInjury } from "../hooks/useInjury";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface ViewTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
}

const ViewTopicModal: React.FC<ViewTopicModalProps> = ({
  isOpen,
  onClose,
  topicId,
}) => {
  const { data, isLoading, isError } = useInjury(topicId);

  const injury = data?.data;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            View Topic
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          </div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-500">
            Failed to load topic details
          </div>
        )}

        {injury && (
          <div className="space-y-4">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic ID */}
              <div>
                <Label className="mb-2 font-semibold">Topic ID</Label>
                <p className="text-gray-700 dark:text-gray-300">{injury.Id}</p>
              </div>

              {/* Topic Name */}
              <div>
                <Label className="mb-2 font-semibold">Topic Name</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Name}
                </p>
              </div>

              {/* Primary Body Region */}
              <div>
                <Label className="mb-2 font-semibold">
                  Primary Body Region
                </Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Primary_Body_Region}
                </p>
              </div>

              {/* Secondary Body Region */}
              <div>
                <Label className="mb-2 font-semibold">
                  Secondary Body Region
                </Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Secondary_Body_Region || "N/A"}
                </p>
              </div>

              {/* Acuity */}
              <div>
                <Label className="mb-2 font-semibold">Acuity</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Acuity}
                </p>
              </div>

              {/* Age Group */}
              <div>
                <Label className="mb-2 font-semibold">Age Group</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Age_Group}
                </p>
              </div>

              {/* Tissue Type */}
              <div>
                <Label className="mb-2 font-semibold">Tissue Type</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Tissue_Type}
                </p>
              </div>

              {/* Etiology Mechanism */}
              <div>
                <Label className="mb-2 font-semibold">Etiology Mechanism</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Etiology_Mechanism}
                </p>
              </div>

              {/* Common Sports */}
              <div>
                <Label className="mb-2 font-semibold">Common Sports</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Common_Sports}
                </p>
              </div>

              {/* Synonyms Abbreviations */}
              <div>
                <Label className="mb-2 font-semibold">
                  Synonyms Abbreviations
                </Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Synonyms_Abbreviations || "N/A"}
                </p>
              </div>

              {/* Importance Level */}
              <div>
                <Label className="mb-2 font-semibold">Importance Level</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Importance_Level}
                </p>
              </div>

              {/* Tags Keywords */}
              <div>
                <Label className="mb-2 font-semibold">Tags Keywords</Label>
                <p className="text-gray-700 dark:text-gray-300">
                  {injury.Tags_Keywords || "N/A"}
                </p>
              </div>

              {/* Description - Full Width */}
              <div className="md:col-span-2">
                <Label className="mb-2 font-semibold">Description</Label>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {injury.Description || "N/A"}
                </p>
              </div>

              {/* Video URL */}
              {injury.Video_URL && (
                <div className="md:col-span-2">
                  <Label className="mb-2 font-semibold">Video</Label>
                  <video
                    src={injury.Video_URL}
                    controls
                    className="w-full max-h-64 rounded-md"
                  />
                </div>
              )}

              {/* Image URL */}
              {injury.Image_URL && (
                <div className="md:col-span-2">
                  <Label className="mb-2 font-semibold">Image</Label>
                  <Image
                    src={injury.Image_URL}
                    alt={injury.Name}
                    width={1024}
                    height={256}
                    unoptimized
                    className="w-full max-h-64 object-contain rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewTopicModal;
