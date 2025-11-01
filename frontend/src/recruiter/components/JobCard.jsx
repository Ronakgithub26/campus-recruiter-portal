export default function JobCard({ job, onEdit, onDelete, onViewApplicants }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{job.title}</h3>
        <p className="text-gray-500">{job.skills}</p>
        <p className="text-gray-400 text-sm">Deadline: {job.deadline}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onViewApplicants(job.id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          View Applicants
        </button>
        <button
          onClick={() => onEdit(job.id)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
