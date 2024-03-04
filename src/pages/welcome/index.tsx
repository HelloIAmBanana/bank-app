function getAsyncData(key: string) {
  const myPromise: Promise<UserData> = new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : []);
    }, 1000);
  });
  return myPromise;
}
type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  hobbies: string[];
  email: string;
  password: string;
  avatarUrl: string;
  gender: string;
  accountType: string;
  role: string;
};
const userName = async () => {
  const currentUserName = await getAsyncData("currentUser");
  return (currentUserName.firstName);
};
const WelcomePage: React.FC = () => {
  return(   {userName>}
    
  );
};
export default WelcomePage;
