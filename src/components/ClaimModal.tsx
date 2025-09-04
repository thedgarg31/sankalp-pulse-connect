import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, User, Calendar, DollarSign, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import type { Claim } from "@/services/mockData";

interface ClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim: Claim | null;
  onEdit?: (claim: Claim, updates: Partial<Claim>) => void;
  mode?: 'view' | 'edit';
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case 'approved': return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'rejected': return <XCircle className="h-5 w-5 text-red-500" />;
    default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    approved: "default",
    rejected: "destructive",
  } as const;
  
  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export const ClaimModal = ({ open, onOpenChange, claim, onEdit, mode = 'view' }: ClaimModalProps) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [editedClaim, setEditedClaim] = useState<Partial<Claim>>({});
  const [notes, setNotes] = useState('');

  if (!claim) return null;

  const handleSave = () => {
    if (onEdit) {
      onEdit(claim, { ...editedClaim, notes });
    }
    setIsEditing(false);
  };

  const handleStatusChange = (status: string) => {
    setEditedClaim({ ...editedClaim, status: status as 'pending' | 'approved' | 'rejected' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            <span>Claim #{claim.id.toString().padStart(6, '0')}</span>
            {getStatusIcon(claim.status)}
            {getStatusBadge(claim.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer</span>
                    <span className="font-semibold">{claim.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer ID</span>
                    <span className="font-mono text-sm">#{claim.customer_id.toString().padStart(6, '0')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Policy Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Policy</span>
                    <span className="font-semibold">{claim.policy_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Policy ID</span>
                    <span className="font-mono text-sm">#{claim.policy_id.toString().padStart(6, '0')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Claim Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(claim.claim_amount)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Submission Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {formatDate(claim.submitted_date || '2024-01-15')}
                </div>
              </CardContent>
            </Card>
          </div>

          {isEditing && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Update Claim Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={editedClaim.status || claim.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add processing notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {!isEditing && onEdit && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Claim
              </Button>
            )}
            {isEditing && (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
