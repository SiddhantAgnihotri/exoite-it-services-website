import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';

export default function NotFound() {
  return <main><PageHero label="404" title="We couldn't find that page" description="The link may have changed. Explore our services or contact us to discuss your project." /><div className="flex justify-center gap-5 px-5 pb-20"><Link className="btn-primary px-6 py-3" to="/">Go to homepage</Link><Link className="btn-secondary px-6 py-3" to="/contact">Contact us</Link></div></main>;
}
