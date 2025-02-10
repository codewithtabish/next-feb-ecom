import { Book, FileText, Video, FileAudio, Image, FileArchive, File, FileCode2 } from "lucide-react";

const materialArray = [
  {
    id: 1,
    name: "Notes / Chapters",
    desc: "Read notes to prepare 🔥",
    path: "notes",
    icon: <Book />,
  },
  {
    id: 2,
    name: "PDF Materials",
    desc: "Download course PDFs 📄",
    path: "pdf-materials",
    icon: <FileText />,
  },
  {
    id: 3,
    name: "Video Lectures",
    desc: "Watch recorded sessions 🎥",
    path: "video-lectures",
    icon: <Video />,
  },
  {
    id: 4,
    name: "Audio Lessons",
    desc: "Listen to course audios 🎧",
    path: "audio-lessons",
    icon: <FileAudio />,
  },
  {
    id: 5,
    name: "Course Images",
    desc: "View illustrations and infographics 🖼️",
    path: "course-images",
    icon: <Image />,
  },
  {
    id: 6,
    name: "Assignments",
    desc: "Submit and review assignments 📑",
    path: "assignments",
    icon: <File />,
  },
  {
    id: 7,
    name: "Quizzes",
    desc: "Test your knowledge with quizzes ✍️",
    path: "quizzes",
    icon: <FileCode2 />,
  },
  {
    id: 8,
    name: "Course Resources",
    desc: "Download additional study materials 🗂️",
    path: "resources",
    icon: <FileArchive />,
  },
];

export default materialArray;
