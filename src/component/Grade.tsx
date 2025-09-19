import { useState } from "react";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradePoints: Record<string, number | null> = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
  W: null, // ถอน ไม่เอามาคิด
};

export default function Grade() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!subjectName.trim()) return;
    setSubjects([
      ...subjects,
      { id: Date.now(), name: subjectName, grade },
    ]);
    setSubjectName("");
    setGrade("A");
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => gradePoints[s.grade] !== null);
    const totalPoints = validSubjects.reduce(
      (acc, s) => acc + (gradePoints[s.grade] ?? 0),
      0
    );
    const gpaValue =
      validSubjects.length > 0 ? totalPoints / validSubjects.length : 0;
    setGpa(gpaValue);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shado bg-gray-700">
      <h2 className="text-xl font-bold mb-4">ระบบคำนวณ GPA</h2>

      {/* ฟอร์มเพิ่มรายวิชา */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="ชื่อวิชา"
          className="border p-2 rounded flex-1"
        />
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          onClick={addSubject}
          className="bg-blue-500 text-black px-3 py-2 rounded hover:bg-blue-600"
        >
          เพิ่ม
        </button>
      </div>

      {/* รายวิชาที่เพิ่ม */}
      <ul className="mb-4">
        {subjects.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span
              className={`${
                s.grade === "F" ? "text-red-500 font-bold" : ""
              }`}
            >
              {s.name} ({s.grade})
            </span>
            <button
              onClick={() => removeSubject(s.id)}
              className="text-red-500 hover:text-red-700"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      {/* ปุ่มคำนวณ GPA */}
      <button
        onClick={calculateGPA}
        className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
      >
        คำนวณ GPA
      </button>

      {/* แสดงผล GPA */}
      {gpa !== null && (
        <div className="mt-4 text-lg font-semibold">
          GPA = {gpa.toFixed(2)}
        </div>
      )}
    </div>
  );
}
