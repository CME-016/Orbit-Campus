import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  PlusCircle, 
  XCircle, 
  Inbox,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

interface DocumentRequest {
  id: string;
  document_type: string;
  status: 'Pending' | 'Processing' | 'Ready for Pickup' | 'Rejected';
  notes: string;
  admin_notes: string;
  file_path: string | null;
  created_at: string;
}

const useDocumentRequests = (userId: number | undefined) => {
  const [documents, setDocuments] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost/php/api/get_document_requests.php?user_id=${userId}`);
        const data = await response.json();
        setDocuments(data.records || []);
      } catch (err) {
        console.error("Failed to fetch documents", err);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [userId]);

  return { data: documents, loading };
};

const DocumentRequest: React.FC = () => {
  const { user } = useAuth();
  const { data: documents, loading } = useDocumentRequests(user?.id);
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const statusConfig: any = {
      Pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      Processing: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
      'Ready for Pickup': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
      Rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold mb-2">Document Requests</h1>
                <p className="text-purple-100">Request and download official documents.</p>
            </div>
            <button 
                onClick={() => navigate('/student/documents/new')}
                className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
                <PlusCircle className="h-5 w-5" />
                <span>New Request</span>
            </button>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
                <div className="text-center p-8">Loading requests...</div>
            ) : documents.length > 0 ? (
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Document Type', 'Requested At', 'Status', ''].map(h => 
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((doc) => {
                            const StatusIcon = statusConfig[doc.status]?.icon || FileText;
                            const isExpanded = expandedRow === doc.id;

                            return (
                                <React.Fragment key={doc.id}>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.document_type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(doc.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full ${statusConfig[doc.status]?.bg} ${statusConfig[doc.status]?.color}`}>
                                                <StatusIcon className="h-4 w-4" />
                                                <span>{doc.status}</span>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                          <button onClick={() => setExpandedRow(isExpanded ? null : doc.id)} className="p-2 rounded-full hover:bg-gray-100">
                                              <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
                                          </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-4 bg-gray-50">
                                                <div className="space-y-4">
                                                    {doc.notes && <p><strong>Your Notes:</strong> {doc.notes}</p>}
                                                    {doc.admin_notes && <p className="text-red-700"><strong>Admin Notes:</strong> {doc.admin_notes}</p>}
                                                    {doc.status === 'Ready for Pickup' && doc.file_path && (
                                                        <a href={doc.file_path} download className="flex items-center space-x-2 text-green-700 font-bold">
                                                          <Download className="h-5 w-5"/>
                                                          <span>Download Document</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-12">
                  <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't requested any documents yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Click "New Request" to get started.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default DocumentRequest;
