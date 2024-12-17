import Image from "next/image";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: "url(/images/bg.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-20"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="flex w-max flex-col">
              <div className="mockup-phone">
                <div className="camera"></div>
                <div className="display">
                  <div
                    className="artboard artboard-demo phone-2"
                    style={{
                      backgroundImage: "url(/images/bg.jpg)",
                    }}
                  >
                    <div className="p-10">
                      <Image
                        src={"/images/logo.png"}
                        alt=""
                        height={500}
                        width={500}
                      />
                      <div>
                        <Link href={"/lol"}>
                          <Image
                            src={"/images/get_it_on_google_play.png"}
                            alt=""
                            height={500}
                            width={500}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="mt-5 bg-red-300 text-lg">Player Stats</p>
              </div>
              <div className="bg-slate-200">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr className="bg-base-200">
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                      </tr>
                      {/* row 3 */}
                      <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
