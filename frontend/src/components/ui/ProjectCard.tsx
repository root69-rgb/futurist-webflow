
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  categories: string[];
  link: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  categories,
  link,
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="overflow-hidden border-0 shadow-md relative h-full card-hover">
      <div
        className="relative h-64 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category, index) => (
              <span
                key={index}
                className="text-xs bg-primary/90 text-white px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-card max-w-3xl w-full max-h-[90vh] overflow-auto rounded-lg">
            <div className="relative h-64 md:h-80">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                onClick={() => setShowDetails(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-xs bg-primary/90 text-white px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground">{description}</p>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <span>View Project</span>
                    <ExternalLink size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;
