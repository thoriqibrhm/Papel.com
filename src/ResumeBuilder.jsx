import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";


const Section = ({ title, id, children, icon, activeSection, toggleSection }) => (
  <div className="border-b">
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex justify-between items-center py-4 px-2 hover:bg-gray-50"
    >
      <div className="flex items-center gap-3 text-gray-700">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <ChevronDown
        className={`transition-transform ${activeSection === id ? "rotate-180" : ""}`}
      />
    </button>

    {activeSection === id && (
      <div className="pb-4 px-2 space-y-3">
        {children}
      </div>
    )}
  </div>
);

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
  });

  const [experiences, setExperiences] = useState([
    { company: "", role: "", description: "" },
  ]);

  const [education, setEducation] = useState([
    { school: "", degree: "", year: "" },
  ]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExpChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", description: "" }]);
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const addEducation = () => {
    setEducation([...education, { school: "", degree: "", year: "" }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* FORM */}
      <Card className="p-4">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold">Resume</h2>

          <Section title="Personal Details" id="personal" icon={<span>👤</span>} activeSection={activeSection} toggleSection={toggleSection}>
            <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          </Section>

          <Section title="Summary" id="summary" icon={<span>📝</span>} activeSection={activeSection} toggleSection={toggleSection}>
            <Textarea name="summary" placeholder="Professional Summary" value={form.summary} onChange={handleChange} />
          </Section>

          <Section title="Experience" id="experience" icon={<span>💼</span>} activeSection={activeSection} toggleSection={toggleSection}>
            {experiences.map((exp, i) => (
              <div key={i} className="space-y-2 border p-3 rounded-xl">
                <Input placeholder="Company" value={exp.company} onChange={(e) => handleExpChange(i, "company", e.target.value)} />
                <Input placeholder="Role" value={exp.role} onChange={(e) => handleExpChange(i, "role", e.target.value)} />
                <Textarea placeholder="Description" value={exp.description} onChange={(e) => handleExpChange(i, "description", e.target.value)} />
              </div>
            ))}
            <Button onClick={addExperience}>+ Add Experience</Button>
          </Section>

          <Section title="Education" id="education" icon={<span>🎓</span>} activeSection={activeSection} toggleSection={toggleSection}>
            {education.map((edu, i) => (
              <div key={i} className="space-y-2 border p-3 rounded-xl">
                <Input placeholder="School" value={edu.school} onChange={(e) => handleEduChange(i, "school", e.target.value)} />
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => handleEduChange(i, "degree", e.target.value)} />
                <Input placeholder="Year" value={edu.year} onChange={(e) => handleEduChange(i, "year", e.target.value)} />
              </div>
            ))}
            <Button onClick={addEducation}>+ Add Education</Button>
          </Section>

          <Section title="Skills" id="skills" icon={<span>⚡</span>} activeSection={activeSection} toggleSection={toggleSection}>
            <Textarea name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
          </Section>

          <Button className="w-full">Download PDF (next step)</Button>
        </CardContent>
      </Card>

      {/* PREVIEW */}
      <Card className="p-6 bg-white overflow-y-auto max-h-screen">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">{form.name || "Your Name"}</h1>
          <p className="text-sm text-gray-600">
            {form.email} | {form.phone}
          </p>

          <div>
            <h2 className="font-semibold">Summary</h2>
            <p>{form.summary}</p>
          </div>

          <div>
            <h2 className="font-semibold">Experience</h2>
            {experiences.map((exp, i) => (
              <div key={i}>
                <p className="font-medium">{exp.role} - {exp.company}</p>
                <p className="text-sm">{exp.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-semibold">Education</h2>
            {education.map((edu, i) => (
              <div key={i}>
                <p className="font-medium">{edu.degree} - {edu.school}</p>
                <p className="text-sm">{edu.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {form.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill)
                .map((skill, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
