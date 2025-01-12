import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
       Seconds To Create Forms,
        <strong className="font-extrabold text-secondary sm:block"> Effortlessly </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      The revolutionary AI form builder that empowers you to create professional, customized forms in just minutes. 
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-secondary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-700 focus:outline-none focus:ring active:bg-primary sm:w-auto"
          href="/dashboard"
        >
          Create Form
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-secondary-700 focus:outline-none focus:ring active:text-primary-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

  )
}

export default Hero