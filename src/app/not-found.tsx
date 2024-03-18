import { redirect } from 'next/navigation';

const NotFound = () => {
  return redirect('/signin');
};

export default NotFound;
