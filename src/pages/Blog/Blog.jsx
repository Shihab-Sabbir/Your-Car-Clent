import React, { useState } from "react";
import { Helmet } from "react-helmet";

const Blog = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    return (
        <div className="flex justify-center mx-auto">
            <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
                <Helmet>
                    <title>Your Car - Blog</title>
                </Helmet>
                <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 dark:text-slate-200">Blog Section</h2>
                <div className="my-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
                    <div className=" ">
                        <p className=" font-normal text-base leading-6 text-gray-600 lg:w-8/12 md:w-9/12 dark:text-slate-200">Most excitig section...</p>
                    </div>
                </div>
                <div className="w-full md:mt-0 sm:mt-14 mt-10 lg:mt-20 ">
                    <div>
                        <div className=" flex justify-between items-center cursor-pointer dark:text-slate-200">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">What are the different ways to manage a state in a React application?</h3>
                            <button aria-label="too" className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow(!show)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show ? "block" : "hidden")}>
                            <p> 1. Web Storage</p>
                            <p> 2. Local State</p>
                            <p> 3. Lifted State</p>
                            <p> 4. Derived State</p>
                            <p> 5. URL</p>
                        </div>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Returns Section --> */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer ">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">How does prototypical inheritance work?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow2(!show2)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show2 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show2 ? "block" : "hidden")}>
                            <p>
                                Prototypal inheritance is when an object inherits from another object. This differs from classical inheritance, in which a class inherits from another class.
                                <br />
                                In a classical language, classes typically define the structure of objects, but in a prototypal language, the objects themselves define their structure, and this structure can be inherited and modified by other objects at runtime.
                            </p>
                            <br />
                            <p>
                                In Javascript, every object has its own hidden, internal property, [[Prototype]]. We can access that [[Prototype]] using the __proto__ property. This calls the program to mark the template object as a hidden type. JavaScript objects must be linked to this prototype object. Now, an object’s properties can be accessed by the inheritor object.
                            </p>
                        </p>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* <!-- Exchange Section --> */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200">What is a unit test? Why should we write unit tests?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow3(!show3)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show3 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show3 ? "block" : "hidden")}>
                            <p className="text-justify">
                                Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.
                                <br />
                                Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                                <br />
                                Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a meticulous approach to building a product by means of continual testing and revision. This testing method is also the first level of software testing, which is performed before other testing methods such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any external code or functions. Testing can be done manually but is often automated.
                            </p>
                        </div>
                    </div>

                    <hr className=" my-7 bg-gray-200" />

                    {/* Tracking Section */}

                    <div>
                        <div className=" flex justify-between items-center cursor-pointer">
                            <h3 className=" font-semibold text-xl leading-5 text-gray-800 dark:text-slate-200 lg:pr-0 pr-1">React vs. Angular vs. Vue?</h3>
                            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow4(!show4)}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className={show4 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.16602 10H15.8327" stroke="#fbbf24" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 dark:text-slate-200 text-justify " + (show4 ? "blcok" : "hidden")}>
                            <div>
                                <p className="font-bold text-xl pb-2">Architecture</p>
                                Speaking of architecture, Angular.js is a full-fledged MVC framework that provides you with all the possibilities for out-of-the-box programming:
                                <br />
                                <br />
                                Templates based on HTML;
                                <br />
                                Dependency injection;
                                <br />
                                Ajax requests;
                                <br />
                                Routing;
                                <br />
                                Encapsulation of CSS components;
                                <br />
                                Components testing utilities;
                                <br />
                                Opportunities to create forms, etc.
                                <br />
                                <br />
                                React.js, on the other hand, is a library that just offers the view, leaving the developer to decide how to construct the Model and Controller. The following features are provided:
                                <br />
                                As an add-on to JavaScript, the JSX language, which is similar to XML, is used instead of templates;
                                <br />
                                No introduction of dependencies;
                                <br />
                                Ajax requests;
                                <br />
                                <br />
                                Vue.js is a library that allows you to create interactive web interfaces. Vue.js is primarily concerned with the ViewModel layer of the MVVM architecture. It uses two-way data bindings to attach the View and the Model. Directives and Filters abstract away the actual DOM operations and output formatting.
                                <br />
                                <p className="font-bold text-xl py-2"> Data Binding</p>
                                Angular.js uses the two-way binding. The state of the model is changed first, and then the modification of the interface element is reflected. The interface element changes as the model’s state changes, which is why two-way data binding is used.
                                <br />
                                React.js has one-way binding. First, the state of the model is updated, and then it reflects the change of the interface element. If you change the interface element, the state of the model stays the same.
                                <br />
                                As on Angular, the data binding on Vue.js is two-way. Vue.js synchronizes the entire model with the DOM mechanically. This implies that all Vue.js templates are fundamentally legal, parsable HTML with a few extra features. Remember this because Vue templates are fundamentally different from string-based templates.
                                <br />
                                <p className="font-bold text-xl py-2">Mobile solutions</p>

                                Each one of the three compared web development frameworks offers mobile solutions for apps development.
                                <br />
                                When it comes to Angular, this is the Ionic framework, which makes use of Angular’s Cordova container. You download the app, which is a web application running within a web browser.
                                <br />
                                React.js doesn’t have a similar framework. React Native is a platform for creating actual native mobile applications.
                                <br />
                                Vue has announced its support for the Alibaba Group’s Weex project, which is a cross-platform UI framework. Weex allows you to develop browser components as well as iOS and Android apps using the same Vue syntax.
                                <br />
                                Ease of learning
                                In the case of React.js, you need to learn JSX first, which is not a problem since it’s quite simple. Then you need to go through the routing library (react-router v4, for example) and then the state management libraries (Redux or MobX).
                                <br />
                                In the case of Angular, there are way more steps to make and information to learn. From basic terms (directives, modules, decorators, components, services, dependency inputs, pipes, and templates), this is followed by topics as change detection, zones, AoT compilation, and Rx.js.
                                <br />
                                And in the case of Vue.js, the fundamental features may be implemented in the first web applications in the least amount of time. Vue is simpler to understand than Angular or React since it is more adaptable. Furthermore, Vue’s functionality, such as the use of components, overlaps with that of Angular and React. Vue.js’s simplicity and adaptability, on the other hand, have a drawback: it enables poor code that is tough to debug and test.
                                <br />
                                <p className="font-bold text-xl py-2">Syntaxs</p>

                                Angular is written in TypeScript, which means you need some time to learn it to work with this framework.
                                <br />
                                React uses JSX and native Javascript developers are familiar with it. The training period is easier and does not require that much preparation.
                                <br />
                                Vue.js makes use of an HTML-based template syntax that allows you to link the displayed DOM to the data of the base element instance declaratively. All Vue.js templates are valid HTML that can be read by HTML analyzers and browsers that follow the standard.
                                <br />
                                Integration
                                Angular provides a basic framework for building web applications and does not require any additional libraries. It is relatively rigid and inflexible as a complete framework.
                                <br />
                                React.js is usually not enough to build a web app. In most instances, using extra libraries is advised. As a result, it’s more adaptable and simple to integrate into current mobile apps.
                                <br />
                                Vue.js allows distinct features of an app to be implemented without altering the architecture. When it comes to integrating with other libraries, Vue is a perfect solution. Vue.js may be used to create both single-page apps and more complex online interfaces for apps.
                                <br />

                                <p className="font-bold text-xl py-2">Performance</p>

                                To capture all changes to the DOM, Angular.js creates a watcher for each binding. Every time the view updates, the new values compare with the old ones. This can end up in poorer performance in large mobile applications.
                                <br />
                                Because React uses a virtual DOM, when the view is modified, the new DOM compares it to the virtual DOM and changes accordingly.
                                <br />
                                Vue.js has better performance thanks to the virtual DOM, which is useful for complicated programs. It may be as little as 20KB while maintaining its speed and versatility, allowing it to achieve considerably better performance than competing frameworks.
                                <br />
                                <p className="font-bold text-xl py-2">Ecosystem</p>

                                The great thing about open source frameworks is that they provide developers with numerous tools or libraries. Thanks to the active community, there are a large number of extensions for Angular, React, and Vue that can be used:
                                <br />
                                For easier bootstrapping of a project;
                                For the development of apps;
                                For design matters;
                                For the administration of states.
                            </div>
                        </div>
                    </div>

                    <hr className=" my-7 bg-gray-200" />
                </div>
            </div>
      </div>
    );
};

export default Blog;
