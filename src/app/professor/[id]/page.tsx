"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, Filter, Calendar, ThumbsUp, ThumbsDown } from "lucide-react";
import AdBanner from "@/components/ad-banner";
import { universities } from "@/lib/university-data";
import { fetchProfessorById, fetchReviewsByProfessorId, fetchSubjects } from "@/lib/database";

// Types

type Professor = {
  id: string;
  name: string;
  universityId: string;
  provinceId?: string;
  subjects: string[];
  averageRating: number;
  totalReviews: number;
};

type Review = {
  id: string;
  professorId: string;
  subjectId: string;
  rating: number;
  difficulty: number;
  wouldTakeAgain: boolean;
  comment: string;
  date: number;
  helpful: number;
  notHelpful: number;
};

type Subject = {
  id: string;
  name: string;
  careerId: string;
  code?: string;
};

export default function ProfessorProfilePage() {
  const params = useParams();
  const professorId = params.id as string;

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [subjectsMap, setSubjectsMap] = useState<Record<string, Subject>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<string>("recent");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [prof, reviewsData, allSubjects] = await Promise.all([
          fetchProfessorById(professorId),
          fetchReviewsByProfessorId(professorId),
          fetchSubjects()
        ]);

        // Actualizar promedio y cantidad de reseñas si hay reseñas disponibles
        if (reviewsData.length > 0) {
          const total = reviewsData.reduce((acc, r) => acc + r.rating, 0);
          const avg = total / reviewsData.length;
          prof.averageRating = avg;
          prof.totalReviews = reviewsData.length;
        }

        setProfessor(prof);
        setReviews(reviewsData);
        setFilteredReviews(reviewsData);

        const subjectsDict: Record<string, Subject> = {};
        allSubjects.forEach((sub) => {
          subjectsDict[sub.id] = sub;
        });
        setSubjectsMap(subjectsDict);
      } catch (error) {
        console.error("Error loading professor data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [professorId]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const sorted = [...reviews];
    switch (filterOption) {
      case "recent":
        sorted.sort((a, b) => b.date - a.date);
        break;
      case "oldest":
        sorted.sort((a, b) => a.date - b.date);
        break;
      case "highest":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
    }
    setFilteredReviews(sorted);
  }, [filterOption, reviews]);

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}>
          ★
        </span>
      ))}
    </div>
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-DO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Cargando información del profesor...</p>
        </div>
      </div>
    );
  }

  if (!professor) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profesor no encontrado</h2>
          <p className="text-gray-600 mb-6">No se pudo encontrar el profesor con el ID especificado.</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ChevronLeft size={18} />
            Volver a la búsqueda
          </Link>
        </div>
      </div>
    );
  }

  const university = universities.find((u) => u.id === professor.universityId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/search" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
          <ChevronLeft size={18} />
          Volver a la búsqueda
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold mx-auto md:mx-0">
              {professor.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-black mb-2">{professor.name}</h1>
              <p className="text-gray-600 mb-4">{university?.name || "Universidad"}</p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(professor.averageRating)}
                  <span className="font-bold text-lg">{professor.averageRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">
                  {professor.totalReviews} {professor.totalReviews === 1 ? "reseña" : "reseñas"}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Materias:</h3>
                <div className="flex flex-wrap gap-2">
                  {professor.subjects.map((subjectId) => {
                    const sub = subjectsMap[subjectId];
                    const label = sub ? `${sub.name}${sub.code ? ` (${sub.code})` : ""}` : subjectId;
                    return (
                      <span key={subjectId} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reseñas */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Reseñas</h2>

          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="recent">Más recientes</option>
              <option value="oldest">Más antiguas</option>
              <option value="highest">Mayor calificación</option>
              <option value="lowest">Menor calificación</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {renderStars(review.rating)}
                        <span className="font-bold">{review.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{subjectsMap[review.subjectId]?.name || review.subjectId}</p>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar size={14} />
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-800">{review.comment}</p>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Dificultad:</span> {review.difficulty}/5
                    </div>
                    <div>
                      <span className="font-semibold">¿Lo tomaría de nuevo?</span> {review.wouldTakeAgain ? "Sí" : "No"}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <button className="text-gray-500 hover:text-blue-600 transition-colors">
                        <ThumbsUp size={16} />
                      </button>
                      <span className="text-sm text-gray-600">{review.helpful}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-gray-500 hover:text-red-600 transition-colors">
                        <ThumbsDown size={16} />
                      </button>
                      <span className="text-sm text-gray-600">{review.notHelpful}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Este profesor aún no tiene reseñas.</p>
            <Link href={`/add-review/${professorId}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <Star size={18} />
              Añadir reseña
            </Link>
          </div>
        )}

        {filteredReviews.length > 0 && (
          <div className="mt-6 text-center">
            <Link href={`/add-review/${professorId}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              <Star size={18} />
              Añadir reseña
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12">
        <AdBanner slot="0987654321" className="h-[250px] bg-gray-100 mb-0" />
      </div>
    </div>
  );
}
