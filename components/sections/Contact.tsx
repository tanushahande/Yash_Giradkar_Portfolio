"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Download, Send, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { contactInfo } from "@/constants";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/animations/variants";
import { openComposeWindow } from "@/lib/compose-email";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim() || `Portfolio message from ${name}`;
    const message = form.message.trim();

    const body = [
      `Hello Yash,`,
      ``,
      `My name is ${name}.`,
      `You can reply to me at: ${email}`,
      ``,
      message,
      ``,
      `---`,
      `Sent via portfolio contact form`,
    ].join("\n");

    openComposeWindow(email, {
      to: contactInfo.email,
      subject,
      body,
    });

    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-padding" aria-label="Contact">
      <div className="container-custom mx-auto">
        <SectionHeading
          label="Get In Touch"
          title="Let's Connect"
          description="Open to analytics roles, internships, and collaborative projects"
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 space-y-6"
          >
            <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
              Contact Information
            </h3>

            {[
              { icon: Mail, label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
              { icon: Phone, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
              { icon: MapPin, label: "Location", value: contactInfo.location, href: undefined },
              { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: contactInfo.linkedin },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-300">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:glow-blue transition-all text-slate-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={contactInfo.resumePath}
                download="Yash_Giradkar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass hover:glow-blue transition-all text-slate-400 hover:text-white"
                aria-label="Download Resume"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <div>
              <label htmlFor="name" className="text-sm text-slate-400 mb-1.5 block">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-slate-400 mb-1.5 block">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-sm text-slate-400 mb-1.5 block">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                placeholder="Internship opportunity / Project collaboration"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-slate-400 mb-1.5 block">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-white text-sm outline-none focus:border-blue-500/50 transition-colors resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <p className="text-[10px] text-slate-500 leading-relaxed">
              Opens compose in your email app with <span className="text-slate-400">To: {contactInfo.email}</span>,
              your subject, and message pre-filled. Gmail addresses open Gmail; other addresses open Outlook.
            </p>

            <Button
              type="submit"
              variant="default"
              size="lg"
              magnetic
              className="w-full"
              disabled={sent}
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Opening...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
