import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { mockPolicies } from "@/services/mockData";

interface NewClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewClaimModal = ({ open, onOpenChange }: NewClaimModalProps) => {
  const [formData, setFormData] = useState({
    policyId: "",
    claimAmount: "",
    description: "",
    incidentDate: "",
    category: "",
    documents: [] as File[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Claim submitted successfully! Your claim ID is #" + Math.floor(Math.random() * 1000000));
    onOpenChange(false);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      policyId: "",
      claimAmount: "",
      description: "",
      incidentDate: "",
      category: "",
      documents: []
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const selectedPolicy = mockPolicies.find(p => p.id.toString() === formData.policyId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6" />
            Submit New Claim
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="policyId">Select Policy</Label>
              <Select value={formData.policyId} onValueChange={(value) => setFormData(prev => ({ ...prev, policyId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your policy" />
                </SelectTrigger>
                <SelectContent>
                  {mockPolicies.map((policy) => (
                    <SelectItem key={policy.id} value={policy.id.toString()}>
                      {policy.policy_name} - {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Claim Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="theft">Theft/Loss</SelectItem>
                  <SelectItem value="damage">Property Damage</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPolicy && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Selected Policy Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Policy:</span>
                    <span className="ml-2 font-medium">{selectedPolicy.policy_name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 font-medium">{selectedPolicy.type.charAt(0).toUpperCase() + selectedPolicy.type.slice(1)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Coverage:</span>
                    <span className="ml-2 font-medium">₹{selectedPolicy.coverage_amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Premium:</span>
                    <span className="ml-2 font-medium">₹{selectedPolicy.premium.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="claimAmount">Claim Amount (₹)</Label>
              <Input
                id="claimAmount"
                type="number"
                placeholder="Enter claim amount"
                value={formData.claimAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, claimAmount: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentDate">Incident Date</Label>
              <Input
                id="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description of Incident</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed description of the incident..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">Supporting Documents</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload supporting documents (photos, receipts, reports)
              </p>
              <Input
                id="documents"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
              {formData.documents.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Uploaded files:</p>
                  {formData.documents.map((file, index) => (
                    <p key={index} className="text-xs text-muted-foreground">{file.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Important:</p>
              <p>Please ensure all information is accurate. False claims may result in policy cancellation.</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
