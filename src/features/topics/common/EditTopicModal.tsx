"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateInjury } from "../hooks/useUpdateInjury";
import { useInjury } from "../hooks/useInjury";
import { Loader2 } from "lucide-react";

interface EditTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string | null;
}

const EditTopicModal: React.FC<EditTopicModalProps> = ({
  isOpen,
  onClose,
  topicId,
}) => {
  const { data, isLoading } = useInjury(topicId);
  const updateInjuryMutation = useUpdateInjury();

  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Primary_Body_Region: "",
    Secondary_Body_Region: "",
    Acuity: "",
    Age_Group: "",
    Tissue_Type: "",
    Etiology_Mechanism: "",
    Common_Sports: "",
    Synonyms_Abbreviations: "",
    Importance_Level: "",
    Description: "",
    Tags_Keywords: "",
  });

  useEffect(() => {
    if (data?.data && isOpen) {
      const injury = data.data;
      queueMicrotask(() => {
        setFormData({
          Id: injury.Id || "",
          Name: injury.Name || "",
          Primary_Body_Region: injury.Primary_Body_Region || "",
          Secondary_Body_Region: injury.Secondary_Body_Region || "",
          Acuity: injury.Acuity || "",
          Age_Group: injury.Age_Group || "",
          Tissue_Type: injury.Tissue_Type || "",
          Etiology_Mechanism: injury.Etiology_Mechanism || "",
          Common_Sports: injury.Common_Sports || "",
          Synonyms_Abbreviations: injury.Synonyms_Abbreviations || "",
          Importance_Level: injury.Importance_Level || "",
          Description: injury.Description || "",
          Tags_Keywords: injury.Tags_Keywords || "",
        });
      });
    }
  }, [data, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topicId) return;

    updateInjuryMutation.mutate(
      {
        id: topicId,
        payload: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Topic
          </DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
          </div>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic ID */}
              <div>
                <Label className="mb-2" htmlFor="Id">
                  Topic ID
                </Label>
                <Input
                  id="Id"
                  name="Id"
                  placeholder="Give Topic ID"
                  value={formData.Id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Topic Name */}
              <div>
                <Label className="mb-2" htmlFor="Name">
                  Topic Name
                </Label>
                <Input
                  id="Name"
                  name="Name"
                  placeholder="Give Topic Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Primary Body Region */}
              <div>
                <Label className="mb-2" htmlFor="Primary_Body_Region">
                  Primary Body Region
                </Label>
                <Input
                  id="Primary_Body_Region"
                  name="Primary_Body_Region"
                  placeholder="primary_body_region"
                  value={formData.Primary_Body_Region}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Secondary Body Region */}
              <div>
                <Label className="mb-2" htmlFor="Secondary_Body_Region">
                  Secondary Body Region
                </Label>
                <Input
                  id="Secondary_Body_Region"
                  name="Secondary_Body_Region"
                  placeholder="secondary_body_region"
                  value={formData.Secondary_Body_Region}
                  onChange={handleInputChange}
                />
              </div>

              {/* Acuity */}
              <div>
                <Label className="mb-2" htmlFor="Acuity">
                  Acuity
                </Label>
                <Input
                  id="Acuity"
                  name="Acuity"
                  placeholder="acuity"
                  value={formData.Acuity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Age Group */}
              <div>
                <Label className="mb-2" htmlFor="Age_Group">
                  Age Group
                </Label>
                <Input
                  id="Age_Group"
                  name="Age_Group"
                  placeholder="age_group"
                  value={formData.Age_Group}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Tissue Type */}
              <div>
                <Label className="mb-2" htmlFor="Tissue_Type">
                  Tissue Type
                </Label>
                <Input
                  id="Tissue_Type"
                  name="Tissue_Type"
                  placeholder="tissue_type"
                  value={formData.Tissue_Type}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Etiology Mechanism */}
              <div>
                <Label className="mb-2" htmlFor="Etiology_Mechanism">
                  Etiology Mechanism
                </Label>
                <Input
                  id="Etiology_Mechanism"
                  name="Etiology_Mechanism"
                  placeholder="etiology_mechanism"
                  value={formData.Etiology_Mechanism}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Common Sports */}
              <div>
                <Label className="mb-2" htmlFor="Common_Sports">
                  Common Sports
                </Label>
                <Input
                  id="Common_Sports"
                  name="Common_Sports"
                  placeholder="common_sports"
                  value={formData.Common_Sports}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Synonyms Abbreviations */}
              <div>
                <Label className="mb-2" htmlFor="Synonyms_Abbreviations">
                  Synonyms Abbreviations
                </Label>
                <Input
                  id="Synonyms_Abbreviations"
                  name="Synonyms_Abbreviations"
                  placeholder="synonyms_abbreviations"
                  value={formData.Synonyms_Abbreviations}
                  onChange={handleInputChange}
                />
              </div>

              {/* Importance Level */}
              <div>
                <Label className="mb-2" htmlFor="Importance_Level">
                  Importance level
                </Label>
                <Input
                  id="Importance_Level"
                  name="Importance_Level"
                  placeholder="importance_level"
                  value={formData.Importance_Level}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Tags Keywords */}
              <div>
                <Label className="mb-2" htmlFor="Tags_Keywords">
                  Tags Keywords
                </Label>
                <Input
                  id="Tags_Keywords"
                  name="Tags_Keywords"
                  placeholder="tags_keywords"
                  value={formData.Tags_Keywords}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description - Full Width */}
              <div className="md:col-span-2">
                <Label className="mb-2" htmlFor="Description">
                  Description
                </Label>
                <Textarea
                  id="Description"
                  name="Description"
                  placeholder="description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              {/* Video URL - File */}
              {/* <div>
                <Label className="mb-2" htmlFor="Video_URL">
                  Video URL
                </Label>
                <Input
                  id="Video_URL"
                  name="Video_URL"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </div> */}

              {/* Image URL - File */}
              {/* <div>
                <Label className="mb-2" htmlFor="Image_URL">
                  Image URL
                </Label>
                <Input
                  id="Image_URL"
                  name="Image_URL"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div> */}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={updateInjuryMutation.isPending}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8"
              >
                {updateInjuryMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Topic"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicModal;
