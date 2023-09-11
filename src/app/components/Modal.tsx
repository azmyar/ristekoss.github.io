import { useCallback, useEffect, useState } from "react";
import ContributorsCard from "./ContributorsCard";
import axios from "axios";

interface Contributors {
    url : string,
    name : string,
    role : string
}

export default function Modal(props : any) : JSX.Element {

    let endpointFE : string = "";
    let endpointBE : string = "";

    const susunJadwal : Contributors[] = [
        {
            url:"/images/placeholder.png",
            name:"Icha",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Viona",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Fajar",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Azmy",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Arshad",
            role:"Designer"
        },
        {
            url:"/images/placeholder.png",
            name:"Davyn Reinhard",
            role:"Product"
        }
    ]
    
    const bikunTracker : Contributors[] = [
        {
            url:"/images/placeholder.png",
            name:"Evan",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Qissa",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Zuhal",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Ricky",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Abby",
            role:"Designer"
        },
        {
            url:"/images/placeholder.png",
            name:"Jeremy Alva Pratama",
            role:"Product"
        },
        {
            url:"/images/placeholder.png",
            name:"Davyn Reinhard",
            role:"Product"
        },
        {
            url:"/images/placeholder.png",
            name:"Vincent Suryakim",
            role:"Git Contributor"
        }
    ] 

    const ristekLink : Contributors[] = [
        {
            url:"/images/placeholder.png",
            name:"Mira",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Indra",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Umar",
            role:"Back-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Marcel",
            role:"Back-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Ahmadhi",
            role:"Back-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Arya Adirianto",
            role:"Designer"
        },
        {
            url:"/images/placeholder.png",
            name:"Jeremy Alva Pratama",
            role:"Product"
        }
    ] 

    const ulasKelas : Contributors[] = [
        {
            url:"/images/placeholder.png",
            name:"Dien",
            role:"Product Manager"
        },
        {
            url:"/images/placeholder.png",
            name:"Edu",
            role:"Front-end Engineer"
        },
        {
            url:"/images/placeholder.png",
            name:"Priyanka",
            role:"Designer"
        },
        {
            url:"/images/placeholder.png",
            name:"Imo",
            role:"Designer"
        },
        {
            url:"/images/placeholder.png",
            name:"Henry Soedibjo",
            role:"Product"
        }
    ] 

    const [contributors, setContributors] : any = useState([]);
    const [app, setApp] : any = useState([]);

    const getGitContributors = async (endpoint : string) =>
    await axios.get(endpoint);

    const fetchContributors = useCallback(async () => {
        if (props.modalApp === 'Susun Jadwal') {
            setApp(susunJadwal)
            endpointFE = "https://api.github.com/repos/ristekoss/susunjadwal-frontend/contributors"
            endpointBE = "https://api.github.com/repos/ristekoss/susunjadwal-backend/contributors"
        } else if (props.modalApp === 'Bikun Tracker') {
            setApp(bikunTracker)
        } else if (props.modalApp === 'Ristek Link') {
            setApp(ristekLink)
            endpointFE = "https://api.github.com/repos/ristekoss/ristek-link/contributors"
        } else {
            setApp(ulasKelas)
            endpointFE = "https://api.github.com/repos/ristekoss/ulaskelas-frontend/contributors"
            endpointBE = "https://api.github.com/repos/ristekoss/ulaskelas-backend/contributors"
        }

        try {

          if (endpointFE){
            const firstDataContributors = await getGitContributors(endpointFE);
            if (endpointBE){
                const secondDataContributors = await getGitContributors(endpointFE);
                setContributors(MergeContributors(firstDataContributors.data, secondDataContributors.data));
            } else {
                setContributors(firstDataContributors.data);
            }
          }

        } catch (error) {
          console.log(error);
        }
      }, []);

    const MergeContributors = (contributors : Array<any>, otherContributors : Array<any>) => {
        if (contributors && otherContributors) {
            var usernames = new Set(contributors?.map((c) => c.login));
            usernames.forEach((username) => {
            if (
                otherContributors.some(
                (contributor) => contributor.login === username,
                )
            ) {
                const indexA = contributors.findIndex(
                (contributor) => contributor.login === username,
                );
                const indexB = otherContributors.findIndex(
                (contributor) => contributor.login === username,
                );

                contributors[indexA].contributions +=
                otherContributors[indexB].contributions;
            }
            });

            var contributorsMerged = [
            ...contributors,
            ...otherContributors?.filter((d) => !usernames.has(d.login)),
            ]
            return contributorsMerged;
        }
    };
    
    useEffect(() => {
        fetchContributors();
    }, [fetchContributors]);

    const staticData = app.map((user :any, index : any) =>(
        <ContributorsCard
            key={index}
            name={user.name}
            url={user.url}
            role={user.role}
        />
    ))

    const gitContributionList = staticData.concat(contributors.map((user : any) => (
        <ContributorsCard
            key={user.id}
            name={user.login}
            url={user.avatar_url}
            role="Git Contributor"
        />
    )));

    return (
        <div className="fade fixed mt-[64px] flex flex-col items-center sm:gap-[20px] md:gap-[40px] gap-[12px] sm:p-[40px] md:p-[60px] p-[20px] w-[90%] sm:max-h-[564px] max-h-[80%] rounded-[20px] bg-white">
            <div className="flex flex-row w-full justify-between">
                <img src={"/icons/cross_box.svg"} className="invisible lg:block hidden"></img>
                <p className="font-bold lg:text-[60px] sm:text-[36px] text-[24px]">
                    People Behind This Product!
                </p>
                <img src={"/icons/cross_box.svg"} onClick={() => props.modal()} className="cursor-pointer"></img>
            </div>
            <div className="flex flex-wrap gap-[20px] w-full justify-center overflow-auto 
                            pt-[8px] pb-[8px]
                            sm:pl-0 pl-[8px]
                            sm:pr-0 pr-[8px]">
                {(contributors != null) && gitContributionList}
            </div>
        </div>
    )
}