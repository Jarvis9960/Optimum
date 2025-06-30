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
import { Calendar, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Treatments: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mock treatment data using same structure as exercises
  const treatments = [
    {
      _id: "treatment1",
      name: "Lower Back Rehabilitation Program",
      abbreviation: "LBRP",
      numOfSets: "4",
      numOfReps: "12",
      unit: "exercises/session",
      purpose: "Comprehensive program designed to strengthen the lower back muscles and improve flexibility for patients with chronic lower back pain.",
      Images: [
        {
          coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
          title: "Core strengthening exercises"
        },
        {
          coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
          title: "Flexibility training"
        }
      ],
      theExercisesIsFor: "Lower Back",
      defficultyLevel: 2,
      duration: "6 weeks",
      sessions: "3/week",
      type: "rehabilitation"
    },
    {
      _id: "treatment2",
      name: "Knee Recovery Protocol",
      abbreviation: "KRP",
      numOfSets: "3",
      numOfReps: "15",
      unit: "exercises/session",
      purpose: "Post-surgery knee rehabilitation protocol focusing on range of motion, strength building, and functional movement patterns.",
      Images: [
        {
          coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
          title: "Range of motion exercises"
        },
        {
          coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
          title: "Strength training"
        }
      ],
      theExercisesIsFor: "Knee",
      defficultyLevel: 3,
      duration: "8 weeks",
      sessions: "4/week",
      type: "post-surgery"
    },
    // Add more mock treatments
    ...Array.from({ length: 15 }, (_, i) => ({
      _id: `treatment_${i + 3}`,
      name: `Treatment Plan ${i + 3}`,
      abbreviation: `tp${i + 3}`,
      numOfSets: "3",
      numOfReps: "10",
      unit: "exercises/session",
      purpose: "Mock treatment plan for demonstration purposes.",
      Images: [
        {
          coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
          title: "Treatment demonstration"
        }
      ],
      theExercisesIsFor: "General",
      defficultyLevel: 1 + (i % 3),
      duration: "4-8 weeks",
      sessions: "2-3/week",
      type: "general"
    }))
  ];

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    treatment.theExercisesIsFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTreatments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTreatments = filteredTreatments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('nav.treatments')}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage treatment plans and protocols
          </p>
        </div>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search treatments..."
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

      {/* Treatments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Treatment Plans ({filteredTreatments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Images</TableHead>
                <TableHead>Treatment Plan</TableHead>
                <TableHead>Duration/Sessions</TableHead>
                <TableHead>Target Area</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTreatments.map((treatment) => (
                <TableRow key={treatment._id}>
                  <TableCell>
                    <div className="flex space-x-1">
                      {treatment.Images.slice(0, 2).map((image, idx) => (
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
                      <p className="font-medium">{treatment.name}</p>
                      <p className="text-sm text-muted-foreground">{treatment.abbreviation.toUpperCase()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{treatment.duration}</p>
                      <p>{treatment.sessions}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{treatment.theExercisesIsFor}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Level {treatment.defficultyLevel}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
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

export default Treatments;
