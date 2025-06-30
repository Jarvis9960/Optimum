import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Activity, Search, Eye, Play, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Exercise {
  _id: string;
  name: string;
  abbreviation: string;
  numOfSets: string;
  numOfReps: string;
  unit: string;
  purpose: string;
  videoLink: string;
  Images: Array<{
    coverImage: string;
    title: string;
    directivesArr: string[];
    goal?: string;
    alternativesArr?: string[];
  }>;
  level: number;
  theExercisesIsFor: string;
  language: string;
  defficultyLevel: number;
  type: string;
}

const Exercises: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock exercise data
  const exercises: Exercise[] = [
    {
      _id: "600ea35afa5f48728edf242d",
      name: "3 Position Heel Raises",
      abbreviation: "3phr",
      numOfSets: "3",
      numOfReps: "10",
      unit: "repetitioner/position",
      purpose: "Övningen stärker vadmusklerna och balanserar de inre- och yttre musklerna i underbenen som stabiliserar fotlederna samt minskar tendensen till utåtvridna fötter.",
      videoLink: "https://optimum-video-storage.s3.eu-north-1.amazonaws.com/3+position+heel+raises.mp4",
      Images: [
        {
          coverImage: "https://optimum-storage.s3.eu-north-1.amazonaws.com/3phr-a-removebg-preview-d43e0243-9039-4dcf-b201-19d5ebdbab10.png",
          title: "Stå och håll i ett dörrhandtag med båda händerna.",
          directivesArr: [
            "Slappna av magen och håll ihop skulderbladen och höfterna rakt ovanför hälarna.",
            "Håll fötterna raka (3:e tån rakt fram), knäna raka och låren spända när du nu reser dig med jämn belastning på bägge fötterna upp på trampdynorna så att du belastar lilltå- och stortådynorna lika mycket."
          ],
          goal: "När du får till övningen på rätt sätt känns det djupt i mitten av vaderna."
        },
        {
          coverImage: "https://optimum-storage.s3.eu-north-1.amazonaws.com/3phr-b-removebg-preview-b09a480c-a5fe-4357-b64e-e63a8fb8b6dc.png",
          title: "Ställ dig nu med fötterna ca 30 grader inåt, stortårna nästan ihop.",
          directivesArr: [
            "I denna position är det extra viktigt att hålla knäna absolut raka (framlåren spända) och att hålla vikten jämnt fördelad på trampdynorna i övre läget."
          ]
        }
      ],
      level: 100,
      theExercisesIsFor: "Legs",
      language: "swedish",
      defficultyLevel: 2,
      type: "training"
    },
    // Add more mock exercises for demonstration
    ...Array.from({ length: 25 }, (_, i) => ({
      _id: `exercise_${i + 2}`,
      name: `Exercise ${i + 2}`,
      abbreviation: `ex${i + 2}`,
      numOfSets: "3",
      numOfReps: "12",
      unit: "repetitions",
      purpose: "Mock exercise for demonstration purposes.",
      videoLink: "",
      Images: [
        {
          coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
          title: "Exercise demonstration",
          directivesArr: ["Follow the instructions carefully"]
        }
      ],
      level: 100,
      theExercisesIsFor: "Full Body",
      language: "english",
      defficultyLevel: 1 + (i % 3),
      type: "training"
    }))
  ];

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.theExercisesIsFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExercises = filteredExercises.slice(startIndex, startIndex + itemsPerPage);

  const handleViewExercise = (exerciseId: string) => {
    navigate(`/exercises/${exerciseId}`);
  };

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('nav.exercises')}
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage exercise library
          </p>
        </div>
        <Button className="mt-4 md:mt-0 medical-gradient text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Exercise
        </Button>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Exercises ({filteredExercises.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Images</TableHead>
                <TableHead>Exercise</TableHead>
                <TableHead>Sets/Reps</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExercises.map((exercise) => (
                <TableRow key={exercise._id}>
                  <TableCell>
                    <div className="flex space-x-1">
                      {exercise.Images.slice(0, 2).map((image, idx) => (
                        <img
                          key={idx}
                          src={image.coverImage}
                          alt={image.title}
                          className="w-8 h-8 object-cover rounded border"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground">{exercise.abbreviation.toUpperCase()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{exercise.numOfSets} sets</p>
                      <p>{exercise.numOfReps} reps</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{exercise.theExercisesIsFor}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Level {exercise.defficultyLevel}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewExercise(exercise._id)}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Exercises;
