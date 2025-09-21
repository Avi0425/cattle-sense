import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Loader2, Download, Share2 } from 'lucide-react';
import { mockBreedData } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface PredictionResult {
  breed_name: string;
  confidence: number;
  breed_id: string;
  characteristics: {
    origin: string;
    primary_use: string;
    average_weight: string;
    distinctive_features: string;
  };
}

const Identify = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults([]);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults([]);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      // Mock results with random breeds
      const shuffled = [...mockBreedData].sort(() => 0.5 - Math.random());
      const mockResults = shuffled.slice(0, 3).map((breed, index) => ({
        breed_name: breed.name,
        confidence: Math.random() * (0.95 - 0.6) + 0.6 - (index * 0.1),
        breed_id: breed.id,
        characteristics: breed.characteristics
      }));
      setResults(mockResults);
      setIsProcessing(false);
      toast({
        title: "Identification Complete",
        description: "Found matches for your cattle image"
      });
    }, 3000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600";
    if (confidence >= 0.6) return "text-yellow-600";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Identify Your Cattle
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload or capture an image to identify the breed with AI precision
            </p>
          </div>

          {/* Upload Interface */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Cattle Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedImage ? (
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-smooth cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drag and drop your image here
                  </p>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPG, PNG, WebP (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Selected cattle"
                      className="w-full max-w-md mx-auto rounded-lg shadow-card"
                    />
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl('');
                        setResults([]);
                      }}
                    >
                      Remove Image
                    </Button>
                    <Button 
                      variant="farm"
                      onClick={processImage}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Identify Breed'
                      )}
                    </Button>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Identification Results
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {results.map((result, index) => (
                  <Card key={result.breed_id} className="shadow-card hover:shadow-elegant transition-smooth">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {result.breed_name}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {index === 0 ? 'Best Match' : `Alternative ${index}`}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getConfidenceColor(result.confidence)}`}>
                            {Math.round(result.confidence * 100)}%
                          </div>
                          <p className="text-sm text-muted-foreground">Confidence</p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={result.confidence * 100} 
                        className="mb-4"
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-foreground">Origin</p>
                          <p className="text-muted-foreground">{result.characteristics.origin}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Primary Use</p>
                          <p className="text-muted-foreground">{result.characteristics.primary_use}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Weight</p>
                          <p className="text-muted-foreground">{result.characteristics.average_weight}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Features</p>
                          <p className="text-muted-foreground">{result.characteristics.distinctive_features}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Identify;