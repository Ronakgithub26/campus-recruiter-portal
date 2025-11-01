export default function ApplicantCard({ applicant, onShortlist, onReject }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{applicant.name}</h3>
        <p className="text-gray-500">{applicant.skills}</p>
        <p className="text-gray-400 text-sm">Status: {applicant.status}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onShortlist(applicant.id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Shortlist
        </button>
        <button
          onClick={() => onReject(applicant.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
