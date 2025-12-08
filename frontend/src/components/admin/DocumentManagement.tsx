import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Clock, FileText, FileUp, Download, Send } from 'lucide-react';

// Define the structure of a document request
interface DocumentRequest {
  id: number;
  user_id: string;
  name: string;
  email: string;
  document_type: string;
  notes: string;
  admin_notes: string;
  status: 'Pending' | 'Processing' | 'Ready for Pickup' | 'Rejected';
  file_path: string | null;
  created_at: string;
}

// Modal component for updating request status
const StatusUpdateModal = ({ isOpen, onClose, request, onUpdate, isSubmitting }: any) => {
  const [status, setStatus] = useState(request?.status);
  const [adminNotes, setAdminNotes] = useState(request?.admin_notes || '');

  useEffect(() => {
    if (request) {
        setStatus(request.status);
        setAdminNotes(request.admin_notes || '');
    }
  }, [request]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    onUpdate(request.id, status, adminNotes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Update Request #{request.id}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select 
              value={status}
              onChange={e => setStatus(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-md">
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
            <textarea 
              rows={4} 
              value={adminNotes}
              onChange={e => setAdminNotes(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Add notes for the student..."></textarea>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} disabled={isSubmitting} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button onClick={handleUpdate} disabled={isSubmitting} className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center space-x-2">
            <Send className="h-4 w-4"/>
            <span>{isSubmitting ? 'Updating...' : 'Update Status'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const DocumentManagement: React.FC = () => {
  const [documentRequests, setDocumentRequests] = useState<DocumentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DocumentRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDocumentRequests();
  }, []);

  const fetchDocumentRequests = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost/php/api/get_document_requests.php');
        const data = await response.json();
        setDocumentRequests(data.records || []);
    } catch (error) {
        console.error('Error fetching document requests:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleOpenModal = (request: DocumentRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  }

  const handleUpdateStatus = async (id: number, status: string, admin_notes: string) => {
    setIsSubmitting(true);
    try {
        const response = await fetch('http://localhost/php/api/update_document_request.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status, admin_notes })
        });
        
        if (response.ok) {
            fetchDocumentRequests();
            setIsModalOpen(false);
        } else {
            const errorResult = await response.json().catch(() => ({ message: 'Failed to update status' }));
            alert(errorResult.message || 'Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id.toString());
        try {
            const response = await fetch('http://localhost/php/api/upload_document.php', {
                method: 'POST',
                body: formData
            });

            if(response.ok) {
                fetchDocumentRequests();
            } else {
                const result = await response.json().catch(() => ({ message: 'Upload failed' }));
                alert(`Upload failed: ${result.message}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('An unexpected error occurred during upload.');
        }
    }
  }
  
  const statusConfig: any = {
      Pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      Processing: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
      'Ready for Pickup': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      Rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Document Workflow</h1>
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="text-center p-8">Loading requests...</div>
                ) : (
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Request ID', 'Student', 'Document Type', 'Status', 'Requested At', 'Actions'].map(h => 
                                    <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {documentRequests.map((req) => {
                                const StatusIcon = statusConfig[req.status]?.icon || FileText;
                                const statusColor = statusConfig[req.status]?.color;
                                const statusBg = statusConfig[req.status]?.bg;

                                // The file_path from the backend is already a full URL. No need to construct it again.
                                const downloadUrl = req.file_path;

                                return (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-700">#{req.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                      <div className="font-semibold">{req.name}</div>
                                      <div className="text-xs text-gray-500">{req.email}</div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{req.document_type}</td>
                                    <td className="py-3 px-4">
                                        <span className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full ${statusBg} ${statusColor}`}>
                                            <StatusIcon className="h-4 w-4" />
                                            <span>{req.status}</span>
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{new Date(req.created_at).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                          <button onClick={() => handleOpenModal(req)} className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-md"><Eye/></button>
                                          {(req.status === 'Ready for Pickup' || req.status === 'Processing') && (
                                            <>
                                              <input type="file" id={`file-upload-${req.id}`} style={{display: 'none'}} onChange={(e) => onFileChange(e, req.id)} />
                                              <button onClick={() => document.getElementById(`file-upload-${req.id}`)?.click()} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md"><FileUp/></button>
                                            </>
                                          )}
                                          {downloadUrl && (
                                              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-md"><Download/></a>
                                          )}
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        <StatusUpdateModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          request={selectedRequest}
          onUpdate={handleUpdateStatus}
          isSubmitting={isSubmitting}
        />
    </div>
  );
};

export default DocumentManagement;
