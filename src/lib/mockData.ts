import holsteinImage from '@/assets/holstein-friesian.jpg';
import jerseyImage from '@/assets/jersey.jpg';
import angusImage from '@/assets/angus.jpg';

export interface BreedData {
  id: string;
  name: string;
  image: string;
  characteristics: {
    origin: string;
    primary_use: string;
    average_weight: string;
    distinctive_features: string;
  };
}

export const mockBreedData: BreedData[] = [
  {
    id: 'holstein_friesian',
    name: 'Holstein Friesian',
    image: holsteinImage,
    characteristics: {
      origin: 'Netherlands',
      primary_use: 'Dairy',
      average_weight: '680-770 kg',
      distinctive_features: 'Black and white patches, large frame'
    }
  },
  {
    id: 'jersey',
    name: 'Jersey',
    image: jerseyImage,
    characteristics: {
      origin: 'Jersey Island',
      primary_use: 'Dairy',
      average_weight: '350-450 kg',
      distinctive_features: 'Golden brown color, smaller build'
    }
  },
  {
    id: 'black_angus',
    name: 'Black Angus',
    image: angusImage,
    characteristics: {
      origin: 'Scotland',
      primary_use: 'Beef',
      average_weight: '500-800 kg',
      distinctive_features: 'Solid black coat, polled (hornless)'
    }
  },
  {
    id: 'brahman',
    name: 'Brahman',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'India',
      primary_use: 'Beef',
      average_weight: '500-700 kg',
      distinctive_features: 'Humped back, drooping ears, heat tolerant'
    }
  },
  {
    id: 'simmental',
    name: 'Simmental',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'Switzerland',
      primary_use: 'Dual Purpose',
      average_weight: '650-900 kg',
      distinctive_features: 'Golden red with white markings'
    }
  },
  {
    id: 'charolais',
    name: 'Charolais',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'France',
      primary_use: 'Beef',
      average_weight: '700-1100 kg',
      distinctive_features: 'Cream to white color, muscular build'
    }
  },
  {
    id: 'hereford',
    name: 'Hereford',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'England',
      primary_use: 'Beef',
      average_weight: '500-800 kg',
      distinctive_features: 'Red body with white face and markings'
    }
  },
  {
    id: 'limousin',
    name: 'Limousin',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'France',
      primary_use: 'Beef',
      average_weight: '650-950 kg',
      distinctive_features: 'Golden wheat to lighter colored'
    }
  },
  {
    id: 'gir',
    name: 'Gir',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'India',
      primary_use: 'Dairy',
      average_weight: '350-450 kg',
      distinctive_features: 'Distinctive curved horns, pendulous ears'
    }
  },
  {
    id: 'sahiwal',
    name: 'Sahiwal',
    image: '/placeholder-cattle.jpg',
    characteristics: {
      origin: 'Pakistan',
      primary_use: 'Dairy',
      average_weight: '400-500 kg',
      distinctive_features: 'Reddish brown color, loose skin'
    }
  }
];