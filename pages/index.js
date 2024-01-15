import Header from '../components/Header';
import ImageUploadCard from '../components/ImageUploadCard';
import TestCorsButton from '@/components/TestCorsButton ';

export default function Home() {
  return (
    <div>
      <Header />
      <ImageUploadCard />
      <br></br><br></br><br></br><br></br>
      <center><TestCorsButton /></center>

      {/* Rest of your page content */}
    </div>
  );
}
