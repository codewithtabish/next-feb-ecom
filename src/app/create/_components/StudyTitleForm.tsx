import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudyTitleFormProps {
  difficultyLevel: string | null;
  setDifficultyLevel: (type: string | null) => void;
  topicTitle: string | null;
  setTopicTitle: (type: string | null) => void;
}

const StudyTitleForm: React.FC<StudyTitleFormProps> = ({
  difficultyLevel,
  setDifficultyLevel,
  topicTitle,
  setTopicTitle,
}) => {
  return (
    <section id="study-title" className="w-full p-4 relative md:min-h-[200px] max-h-[200px]">
      {/* Textarea for Topic Title */}
      <Textarea
        placeholder="Please enter the study topic title"
        className="w-full"
        value={topicTitle || ''} // Ensuring controlled component doesn't get undefined
        onChange={(e) => setTopicTitle(e.target.value)} // Updating state
      />

      {/* Select for Difficulty Level */}
      <Select value={difficultyLevel || undefined} onValueChange={(a)=>setDifficultyLevel(a)}>
        <SelectTrigger className="w-full mt-3">
          <SelectValue placeholder="Select Difficulty">{difficultyLevel || "Select Difficulty"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="moderate">Moderate</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </section>
  );
};

export default StudyTitleForm;
