import SideBar from "components/SideBar"
import NavBar from "components/NavBar"

export default function WebPageLayout(
  {
    children,
    params
  }: {
    children: React.ReactNode;
  } & {params:{webPageName:string}}) {

    const webPageName = decodeURIComponent(params?.webPageName);

    return <section className="flex flex-col w-full">
      <div className="flex w-full" > 
        <NavBar webPageName={webPageName}/>
        </div>
         <div className="flex flex-row w-full" >
            <SideBar webPageName={webPageName}/>
            <div className="flex flex-col w-full">
              <div className="flex justify-center font-bold border-b-2 border-b-cyan-800">
                {webPageName}
              </div>
              {children}
            </div>
        </div>
        </section>
  }
