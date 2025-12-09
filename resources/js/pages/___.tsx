
            <motion.div className="min-h-screen bg-amber-100 flex items-center justify-center flex-col gap-5" id="gallery">
                {/* muncul dari tengah */}
                <h1 className="text-3xl uppercase font-extrabold">Gallery</h1>
                <div className="flex gap-5 flex-wrap justify-center">
                    {galleries.map((gallery) => (
                        <div className="shadow-sm p-3 space-y-3 border border-black/30 rounded-sm">
                            {/* <img */}
                            {/*     src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`} */}
                            {/*     alt={gallery.name} */}
                            {/*     className="aspect-square size-72 object-cover border" */}
                            {/* /> */}
                            {/* <p className="font-bold">{gallery.name}</p> */}
                            <a href="#" className="group relative block bg-black">
                                <img alt="" src={gallery.img_url ? `/storage/${gallery.img_url}` : `/default-img.png`}
                                    className="absolute aspect-square size-72 border inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50" />

                                <div className="relative p-4 sm:p-6 lg:p-8">
                                    <p className="text-sm font-medium tracking-widest text-pink-500 uppercase">Developer</p>

                                    <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

                                    <div className="mt-32 sm:mt-48 lg:mt-64">
                                        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                            <p className="text-sm text-white">
                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis perferendis hic
                                                asperiores quibusdam quidem voluptates doloremque reiciendis nostrum harum.
                                                Repudiandae?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </motion.div>
            <motion.div className="min-h-screen bg-red-100 flex items-center justify-center flex-col gap-5" id="findus">
                <h1 className="text-[12rem] uppercase font-extrabold">Find Us</h1>
            </motion.div>
            <motion.div className="min-h-screen bg-blue-100 flex items-center justify-center flex-col gap-5" id="contactus">
                <h1 className="text-[12rem] uppercase font-extrabold">Contact Us</h1>
            </motion.div>

bg - [#4d6443]

// Variants untuk animasi item
