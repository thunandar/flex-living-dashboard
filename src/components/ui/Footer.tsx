import { Facebook, Instagram, Linkedin, Mail, Phone, Send } from 'lucide-react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Button from './Button';

export default function Footer() {
  return (
    <footer className="bg-flex text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Join The Flex - Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Join The Flex</h3>
            <p className="text-base text-white/90 mb-6">
              Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  type="text"
                  placeholder="First name"
                />
                <FormInput
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <FormInput
                type="email"
                placeholder="Email address"
              />
              <div className="flex gap-3">
                <select className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-white/30 transition-colors w-24 flex-shrink-0">
                  <option className="text-gray-900">GB +44</option>
                </select>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="bg-white/10 border border-white/20 text-white placeholder:text-gray-400 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-white/30 transition-colors flex-1"
                />
              </div>
              <Button variant="white" icon={Send} className="w-full">
                Subscribe
              </Button>
            </div>
          </div>

          {/* The Flex - Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">The Flex</h3>
            <p className="text-base text-white/90 mb-4">
              Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-80">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-base">
              <li><a href="#" className="hover:opacity-80">Blog</a></li>
              <li><a href="#" className="hover:opacity-80">Careers</a></li>
              <li><a href="#" className="hover:opacity-80">Terms & Conditions</a></li>
              <li><a href="#" className="hover:opacity-80">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Locations</h3>
            <ul className="space-y-2 text-base">
              <li><a href="#" className="hover:opacity-80">LONDON</a></li>
              <li><a href="#" className="hover:opacity-80">PARIS</a></li>
              <li><a href="#" className="hover:opacity-80">ALGIERS</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Us
            </h3>
            <div className="space-y-3 text-base">
              <div>
                <p className="font-semibold mb-1">United Kingdom (GB)</p>
                <p className="text-white/90">+44 77 2374 5646</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Algeria (DZ)</p>
                <p className="text-white/90">+33 7 57 59 22 41</p>
              </div>
              <div>
                <p className="font-semibold mb-1">France (FR)</p>
                <p className="text-white/90">+33 6 44 64 57 17</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@theflex.global" className="hover:opacity-80">info@theflex.global</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 mt-8 text-center text-base text-white/80">
          <p>© 2025 The Flex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

