import React, { useState } from "react";
import { Helmet } from "react-helmet";
import tooth from "../../asset/tooth.gif"

const Blog = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    return (
        <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
            <Helmet>
                <title>Smile - Blog</title>
            </Helmet>
            <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 dark:text-slate-200">Blog Section</h2>
            <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
                <div className=" ">
                    <p className=" font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12 dark:text-slate-200">Most excitig section...</p>
                </div>
            </div>
            <div className=" flex md:flex-row flex-col md:justify-center md:items-center md:space-x-8 md:mt-16 mt-8">
                <div className=" md:w-5/12 lg:w-4/12 w-full ">
                    <img src={tooth} alt="Img of Glass bottle" className="w-full outline-none" />
                </div>
                <div className=" md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10 ">
                    <div>
                        <div className=" flex justify-between items-center cursor-pointer dark:text-slate-200">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">Difference between SQL and NoSQL</h3>
                            <button aria-label="too" className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow(!show)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show ? "block" : "hidden")}>
                            <div className="dark:text-slate-200 text-justify">
                                <ol>
                                    <li>
                                        <strong>
                                            Type –
                                        </strong>
                                        &nbsp;
                                        <br />
                                        SQL databases are primarily called as Relational Databases (RDBMS); whereas NoSQL database are primarily called as non-relational or distributed database.&nbsp;<p>&nbsp;
                                        </p>
                                    </li>
                                    <li>
                                        <strong>
                                            Language –
                                        </strong>
                                        &nbsp;
                                        <br />
                                        SQL databases defines and manipulates data based structured query language (SQL). Seeing from a side this language is extremely powerful. SQL is one of the most versatile and widely-used options available which makes it a safe choice especially for great complex queries. But from other side it can be restrictive. SQL requires you to use predefined schemas to determine the structure of your data before you work with it. Also all of your data must follow the same structure. This can require significant up-front preparation which means that a change in the structure would be both difficult and disruptive to your whole system.&nbsp;
                                        <p>A NoSQL database has dynamic schema for unstructured data. Data is stored in many ways which means it can be document-oriented, column-oriented, graph-based or organized as a KeyValue store. This flexibility means that documents can be created without having defined structure first. Also each document can have its own unique structure. The syntax varies from database to database, and you can add fields as you go.&nbsp;
                                        </p>
                                        <p>
                                            &nbsp;
                                        </p>
                                    </li>
                                    <li>
                                        <strong>
                                            Scalability –
                                        </strong>
                                        &nbsp;
                                        <br />
                                        In almost all situations SQL databases are vertically scalable. This means that you can increase the load on a single server by increasing things like RAM, CPU or SSD. But on the other hand NoSQL databases are horizontally scalable. This means that you handle more traffic by sharding, or adding more servers in your NoSQL database. It is similar to adding more floors to the same building versus adding more buildings to the neighborhood. Thus NoSQL can ultimately become larger and more powerful, making these databases the preferred choice for large or ever-changing data sets.
                                        &nbsp;
                                        <p>
                                            &nbsp;
                                        </p>
                                    </li>
                                    <li>
                                        <strong>Structure –</strong>
                                        &nbsp;
                                        <br />
                                        SQL databases are table-based on the other hand NoSQL databases are either key-value pairs, document-based, graph databases or wide-column stores. This makes relational SQL databases a better option for applications that require multi-row transactions such as an accounting system or for legacy systems that were built for a relational structure.
                                        &nbsp;
                                        <p>
                                            &nbsp;
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Returns Section --> */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer ">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">What is JWT, and how does it work?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow2(!show2)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show2 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show2 ? "block" : "hidden")}>
                            <p>JSON Web Token (JWT) is an open standard (<a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a>) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the <strong>HMAC</strong> algorithm) or a public/private key pair using <strong>RSA</strong> or <strong>ECDSA</strong>.</p>
                            <br />
                            <p>Although JWTs can be encrypted to also provide secrecy between parties, we will focus on <em>signed</em> tokens. Signed tokens can verify the <em>integrity</em> of the claims contained within it, while encrypted tokens <em>hide</em> those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.</p>
                        </p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Exchange Section --> */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">What is the difference between javascript and NodeJS?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow3(!show3)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show3 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"font-normal text-base leading-6 text-gray-600 mt-4 w-[99%] " + (show3 ? "block" : "hidden")}>
                            <div className="overflow-x-auto">
                                <table className="table table-compact w-full text-center dark:text-white dark:bg-gray-800">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Javascript</th>
                                            <th>NodeJS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1.</td>
                                            <td>
                                                <p>Javascript is a programming language that is used for writing scripts on the website.</p>
                                            </td>
                                            <td>NodeJS is a Javascript runtime environment.</td>
                                        </tr>
                                        <tr>
                                            <td>2.</td>
                                            <td>Javascript can only be run in the browsers.</td>
                                            <td>We can run Javascript outside the browser with the help of NodeJS.</td>
                                        </tr>
                                        <tr>
                                            <td>3.</td>
                                            <td>It is basically used on the client-side.</td>
                                            <td>It is mostly used on the server-side.</td>
                                        </tr>
                                        <tr>
                                            <td>4.</td>
                                            <td>Javascript is capable enough to add HTML and play with the DOM.</td>
                                            <td>Nodejs does not have capability to add HTML tags.</td>
                                        </tr>
                                        <tr>
                                            <td>5.</td>
                                            <td>Javascript can run in any browser engine as like JS core in safari and Spidermonkey in Firefox.</td>
                                            <td>V8 is the Javascript engine inside of node.js that parses and runs Javascript.</td>
                                        </tr>
                                        <tr>
                                            <td>6.</td>
                                            <td>Javascript is used in frontend development.</td>
                                            <td>Nodejs is used in server-side development.</td>
                                        </tr>
                                        <tr>
                                            <td>7.</td>
                                            <td>Some of the javascript frameworks are RamdaJS, TypedJS, etc.</td>
                                            <td>Some of the Nodejs modules are Lodash, express etc. These modules are to be imported from npm.

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8.</td>
                                            <td>It is the upgraded version of ECMA script that uses Chrome’s V8 engine written in C++.</td>
                                            <td>Nodejs is written in C, C++ and Javascript.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* Tracking Section */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200 lg:pr-0 pr-1">How does NodeJS handle multiple requests at the same time?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow4(!show4)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show4 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#00ACBD" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show4 ? "blcok" : "hidden")}>NodeJS receives multiple client requests and places them into EventQueue. NodeJS is built with the concept of event-driven architecture. NodeJS has its own EventLoop which is an infinite loop that receives requests and processes them. EventLoop is the listener for the EventQueue.
                            <br />
                            <br />
                            If NodeJS can process the request without I/O blocking then the event loop would itself process the request and sends the response back to the client by itself. But, it is possible to process multiple requests parallelly using the NodeJS cluster module or worker_threads module.</p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default Blog;
