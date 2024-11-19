import MaxWidthWrapper from "@/components/MaxWidthWrapper";


export default function Home() {
  return (

    <section>
      <MaxWidthWrapper className="grid grid-cols-1 md:grid-cols-3 py-10 md:py-16 mx-auto">
        <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center py-0 md:py-10 gap-y-2 md:gap-y-16">
          <p className="text-5xl md:text-7xl gap-y-2 font-bold text-white">Welcome to </p>
          <p className="text-5xl md:text-7xl gap-y-2 font-bold text-zinc-400">My <span className="bg-white text-blue-900 p-0.5 rounded-xl"> Website</span></p>
        </div>
        <div className="col-span-1 hidden md:block">
           <img src="/web.jpg" alt='web' className="rounded-xl shadow-xl shadow-primary object-cover"/>
        </div>
      </MaxWidthWrapper>
      {/* */}
      <MaxWidthWrapper className="">
        <p></p>
      </MaxWidthWrapper>
    </section>

  );
}
