import Image from 'next/image';
import React from 'react';

const Element = () => {
    return (
        <>
        
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left Content */}
                <div>
                    <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium">
                    ✨Fast-track your learning
                    </span>

                    <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
                    Learn By
                    <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Doing Real Projects
                    </span>
                    </h1>

                    <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                    Master programming skills from beginner to professional level
                    through project-based courses, real-world challenges, and
                    hands-on learning experiences.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                    <button className="px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700 transition">
                        Explore Courses
                    </button>

                    <button className="px-8 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 font-semibold transition">
                        Become Instructor
                    </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-12">
                    <div>
                        <h3 className="text-3xl font-bold text-slate-900">50K+</h3>
                        <p className="text-sm text-slate-500">Students</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-slate-900">200+</h3>
                        <p className="text-sm text-slate-500">Courses</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-slate-900">4.9★</h3>
                        <p className="text-sm text-slate-500">Rating</p>
                    </div>
                    </div>
                </div>

                {/* Right Image */}
                <div>
                    <Image
                        src="/assets/images/two.svg"
                        alt="Learning by Doing"
                        width={600}
                        height={500}
                        priority
                        className="rounded-2xl object-cover transition-transform duration-500"
                    />

                    </div>
                

                </div>
            </div>

            </section>



            <section className="relative overflow-hidden bg-gradient-to-bl from-slate-50 via-white to-blue-50 py-20">

            {/* Decorative Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <div className="relative flex justify-center order-1">

                    {/* Glow */}
                    <div className="absolute w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px]" />

                    {/* Glass Card */}
                    <div className="relative ">


                    <Image
                        src="/assets/images/one.svg"
                        alt="Put Your Learning Into Practice"
                        width={550}
                        height={450}
                        className="relative"
                    />
                    </div>
                </div>

                {/* Content Side */}
                <div className="order-2">

                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-4 py-1.5 text-sm font-semibold">
                    ✨ Step-by-step lessons
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                    Put Your Learning
                    <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                        Into Practice
                    </span>
                    </h2>

                    <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                    Apply what you learn through real-world projects, coding challenges,
                    and hands-on exercises designed to build job-ready skills and boost
                    your confidence.
                    </p>

                    {/* Feature List */}
                    <div className="mt-7 space-y-4">

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        ✓
                        </div>
                        <span className="text-slate-700 font-medium">
                        Build real-world projects
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        ✓
                        </div>
                        <span className="text-slate-700 font-medium">
                        Learn by solving practical challenges
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        ✓
                        </div>
                        <span className="text-slate-700 font-medium">
                        Become industry ready
                        </span>
                    </div>

                    </div>

                    {/* CTA */}
                    <div className="mt-7">
                    <button className="px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-700 transition-all duration-300">
                        Start Learning
                    </button>
                    </div>

                </div>

                </div>

            </div>
            </section>
        </>
    );
};

export default Element;