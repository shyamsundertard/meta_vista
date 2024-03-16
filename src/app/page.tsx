import MainNavBar from "components/MainNavBar";
import MainSideBar from "components/MainSideBar";

export default function Home() {

  return (
    <main className="flex flex-col w-full">
        <div className="flex" > 
        <MainNavBar/>
        </div>
        <div className="flex flex-row w-full" >
            <MainSideBar/>
            <div className="flex justify-center w-full"><h1>Home Page Content</h1> </div>
        </div>
      </main>
  );
}
