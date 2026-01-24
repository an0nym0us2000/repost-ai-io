import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/ui/Logo";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/20 pt-20 pb-10">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Logo size={32} />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6">
                            Helping creators build their personal brand on LinkedIn with AI-powered content tools.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="size-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="size-5" /></Link>
                            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="size-5" /></Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} RepostAI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
