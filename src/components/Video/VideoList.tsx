import { useState, useEffect } from "react";
import axios from "axios";
import RootLayout from "@/components/Layout/RootLayout";
import Pagination from "@/components/CustomPagination/Pagination";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
};

type PexelsResponse = {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
  prev_page: string;
};

const VideoList = ({ name }: { name: string | string[] }) => {
  const [videos, setVideos] = useState<PexelsResponse>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  console.log(error);
  console.log(videos);

  const fetchVideos = async (pageNumber: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=15}`,
        {
          headers: {
            Authorization:
              "4Qtp0dNylmXg2ldp2mlK4Xm3xeZaCCYSmniyLkC2vllPmctJA3DO8Bjo",
          },
        }
      );

      setVideos(response.data || []);
      setTotal(response?.data?.total_results);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError("Failed to fetch videos. Axios error occurred.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);
  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
  };
  return (
    <RootLayout name={name}>
      <div className="p-4 bg-black">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15].map(
              (el) => (
                <Skeleton key={el} className="w-full h-[400px]" />
              )
            )}
          </div>
        )}

        {!loading && videos?.photos && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {videos?.photos?.map((el, index) => (
                <div key={index} className="">
                  <div className="w-full h-[400px]">
                    <Image
                      alt={el?.alt}
                      width={200}
                      height={400}
                      src={
                        el?.src?.original || "/assets/placeholder-image.webp"
                      }
                      className="rounded-xl w-full h-full object-cover"
                    />
                  </div>
                  <div className="py-2 ">
                    <p className="text-sm text-gray-400">{el?.photographer}</p>
                    {/* <p className="text-sm text-gray-400 text-center">2024.09.10</p> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-14">
              <Pagination
                totalPages={total}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </RootLayout>
  );
};

export default VideoList;
