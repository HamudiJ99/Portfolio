export interface DetailSection {
  img: string;
  title: string;
  text: string;
}

export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  github?: string;
  githubBackend?: string;
  live?: string;
  detailSections: DetailSection[];
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "6-Axis Robot Arm & Conveyor Technology",
    subtitle: "Free rotation of heavy objects with a 6-axis robot arm",
    shortDescription: "Automated system for rotating heavy packages up to 35 kg using a UR5e robot arm, intelligent conveyor system, and ROS-based control.",
    fullDescription: "As part of a systems engineering project at the University of Bremen, an automated system for the free rotation of heavy packages up to 35 kg was developed. The goal was to detect packages on an intelligent conveyor system depending on their orientation and to align them correctly using a 6-axis robot arm. For this purpose, a Cellumation conveyor system, a collaborative UR5e robot, camera systems, and a pneumatically operated tilting mechanism were conceptually combined. Control and communication of the components are handled via ROS (Robot Operating System). Due to external constraints, the final system was designed entirely digitally, including 3D modeling, motion and collision simulation, process planning, and economic evaluation. The project demonstrates a practical, scalable solution for automated logistics and sorting processes.",
    technologies: ["ROS", "Python", "UR5e", "TensorFlow", "3D Modeling"],
    detailSections: [
      {
        img: "/assets/project1/project101.png",
        title: "Concept",
        text: "The final concept combines an intelligently controlled conveyor system with a movable, pneumatically driven ramp and a 6-axis robot arm. Packages are first analyzed for their orientation using a camera and QR code recognition. An adjustable ramp tilts the package in a controlled manner so that the center of gravity is optimally positioned. The robot then takes over the actual rotation movement with a special tool, distributing the load evenly across the axes. The entire system is centrally controlled via ROS and enables the safe rotation of heavy packages regardless of size, weight, or initial position.",
      },
      {
        img: "/assets/project1/project102.png",
        title: "Object Detection",
        text: "For package detection, we chose the program 'TensorFlow.' It can be easily installed on the Raspberry Pi and recognizes objects and their contours. It is based on Python and can most likely be integrated into ROS. TensorFlow can detect objects and determine with a percentage probability what kind of object it is.",
      },
      {
        img: "/assets/project1/project103.png",
        title: "QR Code Scanning",
        text: "For scanning the QR codes, we use 'zbar.' In this program, scanning the QR codes is already fully implemented, and you only need to pass the read data to ROS.",
      },
      {
        img: "/assets/project1/project104.png",
        title: "Cost-effectiveness",
        text: "The project is highly cost-effective: With a one-time investment (excluding cameras, conveyor, and robot), the system can run 24/7 and replace up to three workers. Maintenance is simple, and defective cells can be quickly replaced or updated via software without stopping the system.",
      },
    ],
  },
  {
    id: 2,
    title: "Live Grain Detection in Real-Time",
    subtitle: "AI-based real-time detection of cereal grains",
    shortDescription: "Client-server solution for AI-based grain detection using neural networks, enabling real-time analysis of milling processes.",
    fullDescription: "As part of this project, a client-server solution for AI-based real-time detection of cereal grains was developed. The goal was to automatically detect both unbroken and broken grains after the milling process and to visually present the results in order to identify optimization potential in the crushing process. For this purpose, a neural network based on an SSD object detection model was trained and integrated via a web application. The solution combines a React frontend with dashboards for evaluation, a Python Django backend for model execution, and a cloud-based infrastructure for hosting and authentication. The system enables user-friendly analysis of image data and supports data-driven process decisions in industrial compound feed production.",
    technologies: ["TensorFlow", "React", "Django", "Python", "Docker"],
    detailSections: [
      {
        img: "/assets/project2/project201.png",
        title: "Process Flow",
        text: "The process starts at the feed mill, where raw material is crushed. A camera continuously captures images via a USB stream. These images show grains and serve as the data basis. Some of the images are used for the dataset and preprocessed to train a neural network based on TensorFlow. The trained model is then uploaded to the server. The client (user interface) can make process settings and send requests to the server. The server processes the uploaded images with the trained model and passes the results to the frontend. There, the model recognizes whether grains are broken or unbroken. The classification results are aggregated, evaluated, and visualized. The dashboard displays, among other things, the number of detected grains, classifications, and accuracies. Finally, the entire system is designed to be integrated and operated in Docker containers, enabling scalable and reproducible execution.",
      },
      {
        img: "/assets/project2/project202.png",
        title: "SSD (Single Shot Detector)",
        text: "The SSD model we chose is a so-called convolutional neural network (CNN). In general, a CNN consists of one or more convolutional layers followed by a pooling layer. This can be repeated as often as needed. Usually, the convolutional layer is represented as a matrix, which in our case are the pixels of the color images. The activity of the neurons is calculated by moving a convolution matrix (filter kernel) over the image. Next, pooling removes redundant information. The most common is max pooling, where, for example, a matrix of four 2x2 matrices is reduced to a 2x2 matrix by only taking the value of the most active neuron in each 2x2 matrix. This has several advantages: lower memory requirements and, correspondingly, higher computation speed. Pooling also helps prevent overfitting. The last step is the fully connected layer, which is mainly used for classification and has as many neurons as there are classes.",
      },
      {
        img: "/assets/project2/project203.png",
        title: "Object Detection",
        text: "When the user accesses the Image Detector, they can upload an image with the respective grains via an upload button. The model is capable of identifying images with multiple grains. The image is submitted, and after a short wait, the results are displayed under Process Image. It is worth noting that the waiting times for the COCO-SSD model were significantly longer than for our model. This is because our pre-trained model is specialized for grains.",
      },
      {
        img: "/assets/project2/project204.png",
        title: "Model Training",
        text: "learning_rate: As the name suggests, the learning rate indicates how quickly the network learns. It increases rapidly at the beginning, as the neural network has not learned anything yet, and decreases as the learning process progresses. The learning rate approaches zero over time. The smaller this value becomes, the less the network learns, and at a certain point, the learning rate is so low that the training process can be stopped, even if it is not yet finished, because the network will not improve further. steps_per_second: Finally, we have the steps per second, which simply indicates how fast our network learns. The more steps per second, the faster the network learns.",
      },
    ],
  },
  {
    id: 3,
    title: "Cataloging System",
    subtitle: "A System for Cataloging Variant-Rich Products",
    shortDescription: "Web application for structured management of product schemas with JSON-LD generation, validation, and semantic export capabilities.",
    fullDescription: "The cataloging system supports the structured management, creation, and validation of attributes and schemas for various object types. Users can define attributes including type, unit, synonyms, descriptions, and examples, organize them into classes, and combine them into reusable schemas with defined value ranges. An integrated schema editor and template system enable efficient schema creation and reuse. Additionally, a JSON-LD generator allows structured data to be generated, previewed, and exported. A built-in validator checks JSON-LD code or URLs against selected schemas to detect errors and inconsistencies early. All changes are stored locally in the browser, ensuring persistence and efficient iterative modeling.",
    technologies: ["React", "TypeScript", "JSON-LD", "OWL", "Python"],
    live: "https://hamudij99.github.io/Schema/",
    detailSections: [
      {
        img: "/assets/project3/project301.png",
        title: "System Architecture",
        text: "The system consists of multiple components that are operated by a user. A user can create an arbitrary number of schemas within the system. Each schema contains a set of attributes, with at least one attribute being mandatory. Attributes may be predefined using a controlled vocabulary. In the next step, the JSON-LD generator processes each schema and produces the corresponding JSON-LD code. This code is then validated by the validator, and the indexed URLs can be explored by the crawler program. To ensure continuous availability, the database must be hosted on a server. This allows the crawler to access the URLs at any time and extract product data. The crawler program scans structured websites, extracts relevant product information, and stores it in a structured format for further processing. Finally, the ontology can be transformed and exported into a semantic representation, such as the Web Ontology Language (OWL) format.",
      },
      {
        img: "/assets/project3/project302.png",
        title: "Web Application",
        text: "The web application for managing and validating product schemas is available online. You can explore all features, including the schema editor, JSON-LD generator, and integrated validator, directly in your browser.",
      },
      {
        img: "/assets/project3/project303.png",
        title: "Crawler Program",
        text: "Using the 'Generate Crawler & OWL' function, the specified URLs are crawled individually. The logging window displays the results of the crawling process, showing and extracting any JSON-LD data found on the pages. In the backend, this data is used to generate an OWL file, which is then made available for download. The crawling process takes only a few seconds and runs without noticeable delays. For cases involving a significantly larger number of URLs, a progress bar has been implemented to provide a better estimation of the overall processing time.",
      },
    ],
  },
  {
    id: 4,
    title: "Automated Measurement Data Storage",
    subtitle: "Interface for Electronic Laboratory Notebooks",
    shortDescription: "Interface for automated transfer of measurement data into electronic laboratory notebooks with metadata extraction and GUI.",
    fullDescription: "The project focuses on the development of an interface for the partially automated transfer of measurement data into an electronic laboratory notebook. The objective is to capture, process, and archive research and measurement data from scientific experiments in a structured, efficient, and reliable manner. With the increasing digitalization of scientific workflows, the solution aims to reduce manual data entry and minimize documentation effort. The developed system supports the entire research data management process from data acquisition and processing to long term storage, thereby improving traceability, reusability, and the publication of scientific results.",
    technologies: ["Python", "TDMS", "GUI Development", "Metadata"],
    detailSections: [
      {
        img: "/assets/project4/project401.png",
        title: "Metadata Extraction",
        text: "As part of the project, automated extraction of metadata from measurement and manufacturing files was implemented to enable structured and consistent documentation in the electronic laboratory notebook. Metadata such as measurement parameters, device information, and timestamps are extracted directly from file formats like TDMS and Surface files and processed further without manual input. This reduces documentation effort, minimizes sources of error, and improves the traceability and reusability of research data.",
      },
      {
        img: "/assets/project4/project402.png",
        title: "Graphical User Interface",
        text: "A graphical user interface (GUI) was developed in the project to enable intuitive and efficient interaction with the electronic laboratory notebook. The GUI supports users in the structured acquisition, display, and management of measurement data and automatically extracted metadata. By providing a clear presentation of relevant information as well as guided input and selection processes, documentation effort is reduced and usability is improved.",
      },
      {
        img: "/assets/project4/project403.png",
        title: "Structuring of Metadata",
        text: "The image shows the structured presentation of extracted metadata from various measurement files within an electronic laboratory notebook. The displayed information includes, among others, title, creator, publisher, publication date, resource type, description of measurement parameters, and geographic information. The metadata is automatically extracted from different file formats such as SUR and TDMS files and organized hierarchically.",
      },
    ],
  },
  {
    id: 5,
    title: "Webdesign Made Simple",
    subtitle: "Static Website Template",
    shortDescription: "A simple static demo website demonstrating fundamental web design principles using only HTML and CSS.",
    fullDescription: "This website is a simple static demo page for a fictional web design service called 'Webdesign Made Simple'. It presents a basic layout with navigation, service sections, placeholder text, a newsletter signup, and a footer. The page can be viewed as a template or student project intended to demonstrate fundamental web design and GitHub Pages usage rather than a finished commercial website.",
    technologies: ["HTML", "CSS", "GitHub Pages"],
    live: "https://jhamudi-uni.github.io/WMS.github.io/",
    detailSections: [
      {
        img: "/assets/project5/project501.png",
        title: "WEBDESIGN Made Simple",
        text: "A clean, minimalist website template showcasing responsive design principles. The project demonstrates how to create an effective web presence using only fundamental technologies without any JavaScript frameworks.",
      },
    ],
  },
  {
    id: 6,
    title: "Amazon Shopping Clone",
    subtitle: "Interactive web application for online shopping",
    shortDescription: "A complete Amazon-like shopping experience with product overview, cart, order summary, and shipment tracking – all implemented in a modern web application.",
    fullDescription: "This project is a web application that replicates the Amazon shopping experience. Users can browse products, add them to the cart, proceed to checkout, view their orders, and track shipping status. The app uses a structured product database, dynamic cart logic, and a clean user interface. All business logic is implemented in JavaScript, with the frontend built using HTML and CSS. The application is modular and can be easily extended with new features.",
    technologies: ["JavaScript", "HTML", "CSS", "JSON", "Jasmine"],
    live: "https://hamudij99.github.io/amazon-clone/amazon.html",
    detailSections: [
      {
        img: "/assets/project6/project601.png",
        title: "System Architecture",
        text: "The application consists of several modules: product management, cart, order summary, and shipment tracking. Product data is loaded from a JSON file and displayed dynamically. The architecture follows the Model View Controller (MVC) pattern. The cart logic allows adding, removing, and updating products. Orders are saved and can be viewed in the order history. Shipment tracking simulates the shipping status of each order.",
      },
      {
        img: "/assets/project6/project602.png",
        title: "User Interface",
        text: "The web application offers a user-friendly interface inspired by Amazon's design. Users can filter products, view details, and complete orders with just a few clicks. The pages for cart, checkout, orders, and shipment tracking are clearly structured and provide a seamless shopping experience.",
      },
      {
        img: "/assets/project6/project603.png",
        title: "Modular JavaScript Logic",
        text: "All business logic is organized in modular JavaScript files. Separate modules handle product management, cart, order processing, and delivery. This makes the application easy to maintain and extend. Data is stored in JSON files and processed in the frontend.",
      },
    ],
  },
  {
    id: 7,
    title: "Agent Task",
    subtitle: "Modern Task Management Application",
    shortDescription: "A modern task management app with checklists, deadlines, dark/light mode, and real-time sync – built with React and Spring Boot.",
    fullDescription: "Agent Task is a modern, user-friendly task management application designed for efficient organization and tracking of tasks. The app features a clean and intuitive interface that allows users to create, edit, and manage tasks with titles, descriptions, and deadlines. Each task can include checklist items for detailed planning, and users can easily mark tasks as completed or uncompleted. The application supports both dark and light themes and is fully responsive for desktop and mobile devices. Built with React 19 and Vite 8 on the frontend, and Spring Boot 3.3.5 with PostgreSQL on the backend, the system provides real-time synchronization and excellent performance.",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Maven", "Axios", "React", "JavaScript"],
    github: "https://github.com/HamudiJ99/agent-task-frontend",
    githubBackend: "https://github.com/HamudiJ99/agent-task-backend",
    detailSections: [
      {
        img: "/assets/project7/project701.png",
        title: "Full-Stack Architecture",
        text: "The application follows a modern full-stack architecture with a clear separation between frontend and backend. The React frontend communicates with the Spring Boot REST API through well-defined endpoints for task CRUD operations. The backend uses Spring Data JPA for database access, with Hibernate handling automatic table creation and updates. PostgreSQL serves as the reliable database for persistent storage of all task data.",
      },
      {
        img: "/assets/project7/project703.png",
        title: "Responsive Design & Theming",
        text: "The user interface is optimized for both desktop and mobile devices, providing a seamless experience across different screen sizes. The application features a built-in theme switcher that allows users to toggle between dark and light modes. Theme colors are managed through CSS variables, making customization straightforward and maintainable.",
      },
      {
        img: "/assets/project7/project702.png",
        title: "Task Management Features",
        text: "Users can create tasks with comprehensive details including title, description, and deadline. Each task supports checklist items for breaking down complex tasks into smaller steps. The status tracking system allows marking tasks as completed or not completed with a single click. All changes sync in real-time with the backend, ensuring data consistency across sessions.",
      },
    ],
  },
];

export const featuredProject = {
  title: 'ContentLab',
  shortDescription: 'Modern platform for creating and managing online courses, designed for educators and educational institutions.',
  technologies: ['React', 'TypeScript', 'Vite', 'Firebase', 'MUI'],
  github: 'https://github.com/Hamudij99/contentlab',
  live: 'https://contentlab-6d713.web.app/home',
};
