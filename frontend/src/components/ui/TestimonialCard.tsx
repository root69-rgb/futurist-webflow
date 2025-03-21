
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  rating: number;
  image: string;
}

const TestimonialCard = ({
  name,
  role,
  company,
  testimonial,
  rating,
  image,
}: TestimonialCardProps) => {
  return (
    <Card className="h-full border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-muted-foreground">
              {role}, {company}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={`${
                index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{testimonial}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
