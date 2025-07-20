import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Heart, Users, X } from "lucide-react";

interface CrisisResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrisisResourcesModal({ isOpen, onClose }: CrisisResourcesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-charcoal">Crisis Resources</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-charcoal rounded-full hover:bg-gray-100"
            >
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-soft-red/20 border border-soft-red/30 rounded-xl p-4">
            <h4 className="font-medium text-charcoal mb-2">Emergency Support</h4>
            <p className="text-sm text-gray-600 mb-3">
              If you're having thoughts of self-harm or suicide, please reach out immediately:
            </p>
            <div className="space-y-2">
              <a 
                href="tel:988" 
                className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="text-soft-red" size={20} />
                <div>
                  <p className="font-medium text-charcoal">988 Suicide & Crisis Lifeline</p>
                  <p className="text-sm text-gray-500">24/7 support</p>
                </div>
              </a>
              <a 
                href="sms:741741" 
                className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="text-skyblue" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Crisis Text Line</p>
                  <p className="text-sm text-gray-500">Text HOME to 741741</p>
                </div>
              </a>
            </div>
          </div>
          
          <div className="bg-sage/10 border border-sage/20 rounded-xl p-4">
            <h4 className="font-medium text-charcoal mb-2">Additional Resources</h4>
            <div className="space-y-2">
              <a 
                href="https://www.nami.org/Support" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className="text-sage" size={20} />
                <div>
                  <p className="font-medium text-charcoal">NAMI Support</p>
                  <p className="text-sm text-gray-500">Mental health resources</p>
                </div>
              </a>
              <a 
                href="https://www.psychologytoday.com/us/groups" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="text-skyblue" size={20} />
                <div>
                  <p className="font-medium text-charcoal">Local Support Groups</p>
                  <p className="text-sm text-gray-500">Find community near you</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
