import React, { useState, useEffect } from "react";
import { Lecture } from "@/entities/Lecture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Search, BookOpen, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

import LectureCard from "../components/lectures/LectureCard";
import EmptyState from "../components/lectures/EmptyState";

export default function LecturesPage() {
  const [lectures, setLectures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLectures();
  }, []);

  const loadLectures = async () => {
    setIsLoading(true);
    const data = await Lecture.list("-created_date");
    setLectures(data);
    setIsLoading(false);
  };

  const filteredLectures = lectures.filter(lecture => 
    lecture.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lecture.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Lectures</h1>
            <p className="text-slate-600 font-medium">Your recorded lectures and notes</p>
          </div>
          <Link to={createPageUrl("Record")}>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 px-6 py-6 rounded-xl font-semibold">
              <Plus className="w-5 h-5 mr-2" />
              New Recording
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search lectures by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md transition-all"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredLectures.length === 0 ? (
          searchQuery ? (
            <div className="text-center py-16">
              <p className="text-slate-500 font-medium">No lectures found matching "{searchQuery}"</p>
            </div>
          ) : (
            <EmptyState />
          )
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {filteredLectures.map((lecture) => (
                <LectureCard key={lecture.id} lecture={lecture} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
