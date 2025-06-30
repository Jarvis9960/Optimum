
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Play, Target, AlertCircle, Award, Clock, Zap } from 'lucide-react';

const ExerciseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock exercise data - in real app this would be fetched by ID
  const exercise = {
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
          "Håll fötterna raka (3:e tån rakt fram), knäna raka och låren spända när du nu reser dig med jämn belastning på bägge fötterna upp på trampdynorna så att du belastar lilltå- och stortådynorna lika mycket.",
          "Tänk samtidigt på att hålla tillbaka höfterna så att de håller sig rakt ovanför fotlederna (ej skjuts framåt mot dörren).",
          "Tryck till lite extra i det övre läget så att det känns kraftigt i djupa vaderna och sänk åter ner till golvet.",
          "Utför valt antal repetitioner och vrid fötterna utåt ca 30 grader och gör valt antal repetitioner på samma sätt."
        ],
        goal: "När du får till övningen på rätt sätt känns det djupt i mitten av vaderna."
      },
      {
        coverImage: "https://optimum-storage.s3.eu-north-1.amazonaws.com/3phr-b-removebg-preview-b09a480c-a5fe-4357-b64e-e63a8fb8b6dc.png",
        title: "Ställ dig nu med fötterna ca 30 grader inåt, stortårna nästan ihop.",
        directivesArr: [
          "I denna position är det extra viktigt att hålla knäna absolut raka (framlåren spända) och att hålla vikten jämnt fördelad på trampdynorna i övre läget (undvik att låta vikten falla ut mot lilltårna).",
          "Kom även här ihåg att inte skjuta höfterna framåt (=hänga fram höfterna), de ska hållas rakt ovanför hälarna hela tiden.",
          "Upprepa valt antalet repetitioner och set i varje position."
        ],
        goal: "När du får till övningen på rätt sätt känns det djupt i mitten av vaderna.",
        alternativesArr: [
          "Det vanligaste felet om man inte känner djupt inne i vaderna är att man faller ut mot lilltåsidan i övre läget av tåhävningen (och inte pressar ordentligt in mot stortådynan). Det kan också hjälpa om du tar i lite extra, så att du kommer lite högre i övre positionen samtidigt som du ändå håller tårna så avslappnade som möjligt."
        ]
      }
    ],
    level: 100,
    theExercisesIsFor: "Legs",
    language: "swedish",
    defficultyLevel: 2,
    type: "training",
    contraindications: "Smärtor i fötterna, ev. hallux valgus, plantar fasciit etc."
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/exercises')} className="hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Exercises
        </Button>
      </div>

      {/* Video Section */}
      {exercise.videoLink && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                controls 
                className="w-full h-96 object-cover"
                poster={exercise.Images[0]?.coverImage}
              >
                <source src={exercise.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-4 left-4">
                <Badge className="bg-black/50 text-white">
                  <Play className="h-3 w-3 mr-1" />
                  Video Guide
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercise Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {exercise.name}
                </h1>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {exercise.abbreviation.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{exercise.numOfSets}</p>
                  <p className="text-sm text-blue-600 font-medium">Sets</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{exercise.numOfReps}</p>
                  <p className="text-sm text-green-600 font-medium">Reps</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{exercise.defficultyLevel}</p>
                  <p className="text-sm text-purple-600 font-medium">Level</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Unit</p>
                  <p className="text-sm text-orange-600">{exercise.unit}</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Badge className="mb-4 bg-primary/10 text-primary">{exercise.theExercisesIsFor}</Badge>
              <div className="space-y-3">
                <Button className="w-full medical-gradient text-white">
                  Add to Treatment Plan
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Favorites
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purpose and Contraindications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <Target className="h-5 w-5" />
                <span>Exercise Purpose</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {exercise.purpose}
              </p>
            </CardContent>
          </Card>

          {exercise.contraindications && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span>Contraindications</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 leading-relaxed">
                  {exercise.contraindications}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-muted-foreground">Type</p>
                <p className="capitalize">{exercise.type}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-muted-foreground">Language</p>
                <p className="capitalize">{exercise.language}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium text-muted-foreground">Level</p>
                <p>{exercise.level}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Step-by-step Instructions */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Step-by-Step Instructions
        </h2>
        
        {exercise.Images.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={step.coverImage}
                      alt={step.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">
                        Step {index + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    
                    {step.directivesArr && step.directivesArr.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Instructions:
                        </h4>
                        <ul className="space-y-2">
                          {step.directivesArr.map((directive, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {directive}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.goal && (
                      <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                          Goal:
                        </h4>
                        <p className="text-green-600 dark:text-green-400 text-sm leading-relaxed">
                          {step.goal}
                        </p>
                      </div>
                    )}

                    {step.alternativesArr && step.alternativesArr.length > 0 && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                          Tips:
                        </h4>
                        <ul className="space-y-1">
                          {step.alternativesArr.map((alt, idx) => (
                            <li key={idx} className="text-blue-600 dark:text-blue-400 text-sm leading-relaxed">
                              • {alt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseDetail;
