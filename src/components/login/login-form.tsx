"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
  UserCog,
  BarChart3,
  Database,
  Settings,
  Key
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [themeAnimating, setThemeAnimating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [securityLevel, setSecurityLevel] = useState(0);

  // Canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];

    const createParticles = () => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color:
            theme === "dark"
              ? `rgba(59, 130, 246, ${0.2 + Math.random() * 0.3})`
              : `rgba(59, 130, 246, ${0.1 + Math.random() * 0.2})`
        });
      }
    };

    createParticles();

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(59, 130, 246, ${opacity * 0.2})`
                : `rgba(59, 130, 246, ${opacity * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width)
          particle.speedX = -particle.speedX;
        if (particle.y < 0 || particle.y > canvas.height)
          particle.speedY = -particle.speedY;

        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      connectParticles();
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Password strength checker
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 1;
      if (/[A-Z]/.test(formData.password)) strength += 1;
      if (/[a-z]/.test(formData.password)) strength += 1;
      if (/[0-9]/.test(formData.password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
      setSecurityLevel(strength);
    } else {
      setSecurityLevel(0);
    }
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (formData.email.includes("admin") && formData.password.length >= 6) {
        setTimeout(() => {
          setIsSuccess(true);
          toast.success("Connexion réussie", {
            description: "Redirection vers le tableau de bord..."
          });
          setTimeout(() => {
            router.push("/admin/dashboard");
          }, 1500);
        }, 1000);
      } else {
        setTimeout(() => {
          setError("Identifiants invalides");
          toast.error("Échec de la connexion", {
            description: "Vérifiez vos identifiants"
          });
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setError("Une erreur est survenue");
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setThemeAnimating(true);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setTimeout(() => setThemeAnimating(false), 500);
    }, 300);
  };

  const getSecurityLevelColor = () => {
    if (securityLevel <= 1) return "bg-red-500";
    if (securityLevel <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex min-h-screen w-full relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:via-slate-900 dark:to-black opacity-80" />

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative">
        {mounted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-100 dark:border-blue-900 group"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {!themeAnimating && (
                <motion.div
                  key={theme}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 text-slate-700 group-hover:text-blue-600 transition-colors duration-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="p-3 bg-blue-100/80 dark:bg-blue-900/50 rounded-xl shadow-inner relative overflow-hidden group backdrop-blur-sm border border-blue-200 dark:border-blue-800">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 to-blue-300/20 dark:from-blue-700/20 dark:to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-400 relative z-10" />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 tracking-wider">
              ADMINISTRATION
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Eureka Admin
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md bg-white/90 dark:bg-slate-900/80 overflow-hidden dark:text-white border border-blue-100/50 dark:border-blue-900/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email administrateur"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setActiveInput("email")}
                      onBlur={() => setActiveInput(null)}
                      className={`h-12 pl-10 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        activeInput === "email"
                          ? "ring-2 ring-blue-500 border-transparent"
                          : ""
                      }`}
                    />
                    <Mail
                      className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        activeInput === "email"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      onFocus={() => setActiveInput("password")}
                      onBlur={() => setActiveInput(null)}
                      className={`h-12 pl-10 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        activeInput === "password"
                          ? "ring-2 ring-blue-500 border-transparent"
                          : ""
                      }`}
                    />
                    <Lock
                      className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        activeInput === "password"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Force du mot de passe:
                        </span>
                        <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-full w-1/5 ${
                                i < securityLevel
                                  ? getSecurityLevelColor()
                                  : "bg-transparent"
                              } transition-all duration-300`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          rememberMe: checked as boolean
                        })
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Se souvenir de moi
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    Mot de passe oublié ?
                  </a>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
                    disabled={isLoading || isSuccess}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Connexion...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center group">
                        Se connecter
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-900/40 dark:to-slate-900/60 z-10" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Panneau d'administration
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Gérez votre plateforme Eureka Learn avec des outils puissants et
              sécurisés
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            {[
              {
                icon: UserCog,
                title: "Utilisateurs",
                description: "Gérez les comptes et les permissions",
                delay: 0.7
              },
              {
                icon: BarChart3,
                title: "Statistiques",
                description: "Analysez les performances",
                delay: 0.8
              },
              {
                icon: Database,
                title: "Configuration",
                description: "Paramétrez la plateforme",
                delay: 0.9
              },
              {
                icon: Settings,
                title: "Maintenance",
                description: "Surveillez le système",
                delay: 1.0
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: item.delay, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 rounded-xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <item.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700"
          >

            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
