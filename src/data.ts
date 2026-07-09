// Structured resume data and assets for Yashas K's portfolio

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  cgpa: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tech: string[];
}

export const RESUME_DATA = {
  name: "YASHAS K",
  title: "Aspiring Android Developer | Exploring Generative AI & Smart Mobile Solutions",
  location: "Bangalore, India",
  email: "yashas.k26@gmail.com",
  phone: "90351 16991",
  linkedin: "linkedin.com/in/yashask26",
  linkedinUrl: "https://www.linkedin.com/in/yashask26",
  summary: "Aspiring Software Developer with practical experience in Android development, Machine Learning, and AI-based applications through academic and internship projects. Proficient in Kotlin, Firebase, HTML, CSS, JavaScript, and frontend development with strong problem-solving and teamwork skills. Interested in creating impactful technology solutions that combine innovation, usability, and real-world applications.",
  
  internship: {
    role: "Android Development Intern",
    company: "MindMatrix",
    duration: "Completed (2025)",
    description: "Successfully completed an internship in Android App Development and Generative AI at MindMatrix. Contributed to the Namma Metro Sahaya project by working on application development, Firebase integration, feature implementation, and user-friendly interface design while exploring GenAI concepts for smart public transportation assistance."
  },

  education: [
    {
      institution: "KNS Institute of Technology",
      degree: "B.E (Information Science and Engineering)",
      duration: "2022 – 2026",
      cgpa: "8.1 CGPA"
    },
    {
      institution: "SRS PU College",
      degree: "PUC",
      duration: "2021 - 2022",
      cgpa: "8.2 CGPA"
    },
    {
      institution: "SJ M Residential School",
      degree: "SSLC",
      duration: "2019 - 2020",
      cgpa: "8.8 CGPA"
    }
  ] as EducationItem[],

  skills: [
    {
      title: "Core Technologies",
      skills: ["Kotlin", "Jetpack Compose", "Firebase", "JavaScript", "HTML", "CSS", "Android SDK", "Java"]
    },
    {
      title: "AI & Development Tools",
      skills: ["Android Studio", "Google AI Studio", "Generative AI", "RESTful APIs", "LLMs (Gemini)", "Git", "Machine Learning", "CNNs"]
    },
    {
      title: "Professional Strengths",
      skills: ["Debugging & Diagnostics", "Interactive Enhancement", "Project-Based Learning", "Firebase Integration", "Android Workflow"]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "metro-sahaya",
      title: "Namma Metro Sahaya",
      subtitle: "GenAI-Powered Android Navigator",
      description: "An Android application designed to help users navigate the Bengaluru Metro system more easily, providing route guidance, interchange assistance, and exit support.",
      longDescription: "Namma Metro Sahaya is an innovative Android application centered around helping passengers, particularly those visiting from rural areas or unfamiliar with the city, navigate the Bengaluru (Namma) Metro network. It integrates Google AI Studio and Generative AI to provide conversational guidance. By typing or saying where they are and where they want to go, the virtual assistant provides platform instructions, interchange advice at Majestic (Kempegowda) station, fares, estimated travel time, and the correct exit numbers to minimize confusion.",
      tech: ["Kotlin", "Jetpack Compose", "Google AI Studio", "Gemini API", "Firebase Auth", "Firestore"]
    },
    {
      id: "crop-disease",
      title: "Crop Disease Detection",
      subtitle: "CNN-Based Agricultural Diagnostics",
      description: "A machine learning and web solution developed to identify crop diseases from leaf images, assisting in early detection and smart farming.",
      longDescription: "This agricultural tech project aims to support local farmers with early disease diagnosis. It features a responsive frontend dashboard coupled with a manually trained Convolutional Neural Network (CNN) model built in Python. Users can upload images of affected leaves, and the model classifies them into healthy or diseased categories (e.g., Early Blight, Late Blight, Rust) with a confidence score, accompanied by local-language suggestions for treatment.",
      tech: ["Python", "TensorFlow/Keras", "CNN Model", "HTML", "CSS", "JavaScript"]
    }
  ] as ProjectItem[],

  symposium: {
    title: "Presented Paper at National Conference (SKITE 2025)",
    topic: "Crop Disease Detection",
    conference: "National Conference on Smart Knowledge Discovery in Information Technology and Communication Engineering",
    location: "KNSIT, Bangalore"
  }
};

// Data for Bengalore Metro Simulator
export interface MetroStation {
  id: string;
  name: string;
  line: "Purple" | "Green" | "Interchange";
}

export const METRO_STATIONS: MetroStation[] = [
  { id: "majestic", name: "Majestic (Kempegowda)", line: "Interchange" },
  { id: "indiranagar", name: "Indiranagar", line: "Purple" },
  { id: "whitefield", name: "Whitefield (Kadugodi)", line: "Purple" },
  { id: "mgroad", name: "MG Road", line: "Purple" },
  { id: "cubbonpark", name: "Cubbon Park", line: "Purple" },
  { id: "vidhanasoudha", name: "Vidhana Soudha", line: "Purple" },
  { id: "jayanagar", name: "Jayanagar", line: "Green" },
  { id: "banashankari", name: "Banashankari", line: "Green" },
  { id: "yeshwanthpur", name: "Yeshwanthpur", line: "Green" },
  { id: "rajajinagar", name: "Rajajinagar", line: "Green" }
];

export interface MetroRouteInfo {
  duration: number; // minutes
  fare: number; // INR
  stationsCount: number;
  interchangeNeeded: boolean;
  instructions: string[];
  chatResponse: string;
}

export const METRO_ROUTES_DB: Record<string, MetroRouteInfo> = {
  "jayanagar-indiranagar": {
    duration: 32,
    fare: 45,
    stationsCount: 11,
    interchangeNeeded: true,
    instructions: [
      "Board Green Line train towards Majestic (Kempegowda) at Jayanagar.",
      "De-board at Majestic (Interchange) station.",
      "Follow Purple Line overhead signage and head to Platform 1.",
      "Board Purple Line train heading towards Whitefield.",
      "De-board at Indiranagar Metro Station.",
      "Exit towards Indiranagar 100 Feet Road (Exit B)."
    ],
    chatResponse: "Namaskara! To go from Jayanagar to Indiranagar: Take the Green Line from Jayanagar towards Majestic. At Majestic, exit the train and walk towards the Purple Line area (follow the purple arrows on the floor). Go to Platform 1 and catch the Purple Line train going towards Whitefield. Indiranagar is the 6th station from Majestic. Use Exit B to reach 100 Feet Road."
  },
  "majestic-whitefield": {
    duration: 45,
    fare: 60,
    stationsCount: 18,
    interchangeNeeded: false,
    instructions: [
      "Head to Platform 1 (Purple Line) at Majestic Station.",
      "Board Purple Line train towards Whitefield.",
      "Travel through central stations (MG Road, Indiranagar, KR Puram).",
      "De-board at Whitefield (Kadugodi) Metro Station.",
      "Use Exit A for the main bus stand and tech parks."
    ],
    chatResponse: "Hello! Traveling from Majestic to Whitefield is simple since it's a direct route on the Purple Line. Go to Platform 1 at Majestic. Board the train bound for Whitefield. Sit back for a 45-minute ride across the city. Once you arrive at Whitefield (Kadugodi), take Exit A to access the tech parks and immediate bus transfers."
  },
  "yeshwanthpur-vidhanasoudha": {
    duration: 25,
    fare: 35,
    stationsCount: 8,
    interchangeNeeded: true,
    instructions: [
      "Board Green Line train towards Silk Institute at Yeshwanthpur.",
      "De-board at Majestic (Kempegowda) Station.",
      "Switch over to Purple Line (Platform 1).",
      "Board train heading towards Whitefield.",
      "De-board at Vidhana Soudha / Dr. B.R. Ambedkar Station.",
      "Exit from Exit C directly in front of the Vidhana Soudha building."
    ],
    chatResponse: "Welcome! To reach Vidhana Soudha from Yeshwanthpur: Take the Green Line from Yeshwanthpur heading South to Majestic. When you de-board at Majestic, follow the Purple indicators to platform 1. Board the Purple Line train heading East (towards Whitefield) and get off at Vidhana Soudha (the 3rd stop). Exit C brings you right in front of the beautiful Vidhana Soudha state capitol."
  },
  "default": {
    duration: 15,
    fare: 25,
    stationsCount: 4,
    interchangeNeeded: false,
    instructions: [
      "Check the line of your starting station.",
      "Board the train in the direction of your destination station.",
      "For connections between Purple and Green Lines, change at Majestic Station."
    ],
    chatResponse: "I can help you navigate! If you're traveling between lines, remember that Majestic (Kempegowda) is the universal interchange station where Green and Purple lines meet. Switch floors there and follow the colored arrows on the ground."
  }
};

// Data for Crop Disease Diagnostics
export interface CropSample {
  id: string;
  name: string;
  cropType: string;
  status: "Healthy" | "Diseased";
  diseaseName?: string;
  confidence: number;
  symptoms: string;
  recommendations: string[];
  imageUrl: string;
}

export const CROP_SAMPLES: CropSample[] = [
  {
    id: "tomato-blight",
    name: "Tomato Leaf (Blight Specimen)",
    cropType: "Tomato",
    status: "Diseased",
    diseaseName: "Early Blight (Alternaria solani)",
    confidence: 94.7,
    symptoms: "Target-like dark brown spots with concentric rings, primarily on older leaves. Leaves yellowing and drying up around the edges.",
    recommendations: [
      "Remove and destroy infected lower leaves immediately to prevent upward spread.",
      "Apply copper-based organic fungicides early in the morning.",
      "Practice drip irrigation instead of overhead watering to keep foliage dry."
    ],
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "corn-rust",
    name: "Corn Leaf (Rust Specimen)",
    cropType: "Maize/Corn",
    status: "Diseased",
    diseaseName: "Common Rust (Puccinia sorghi)",
    confidence: 89.2,
    symptoms: "Elongated golden-brown pustules on both upper and lower leaf surfaces. Pustules powdery when rubbed, releasing orange-red spores.",
    recommendations: [
      "Sow rust-resistant hybrid seed varieties in the next cycle.",
      "Ensure proper plant spacing to enhance airflow and sunlight penetration.",
      "Apply recommended triazole fungicides if infection exceeds 10% of leaf area."
    ],
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "healthy-potato",
    name: "Potato Leaf (Healthy Specimen)",
    cropType: "Potato",
    status: "Healthy",
    confidence: 98.4,
    symptoms: "Uniform vibrant green coloring, fully hydrated, strong leaf turgor pressure. No spotting, discoloration, or pest feeding visible.",
    recommendations: [
      "Continue regular weeding and nutrient schedules (balanced N-P-K fertilizer).",
      "Monitor daily for early symptoms of Late Blight, especially in damp conditions.",
      "Ensure efficient soil drainage."
    ],
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400"
  }
];

// Suggested questions for Chatbot
export const SUGGESTED_QUESTIONS = [
  "What is Yashas's background?",
  "Tell me about 'Namma Metro Sahaya'",
  "What skills did he develop at MindMatrix?",
  "How can I contact Yashas K?",
  "Tell me about the Crop Disease Detection project"
];
