"use client";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import DressForm from "./components/DressForm";
import DressFormResults from "./components/DressFormResults";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SkeletonLoader from "./components/SkeletonLoader";
import BurgerIcon from "./components/BurgerIcon";
import axios from "axios";

const Home: NextPage = () => {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any[]>([]);

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/submit", formData);
      const suggestionData = response.data.suggestion;
      const parsedSuggestion = JSON.parse(suggestionData);
      setSuggestion(parsedSuggestion);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBurgerClick = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#333333]">
      <Head>
        <title>Everyday Dress Form</title>
        <meta name="description" content="Suggest an everyday dress" />
      </Head>
      <Header />
      <main className="flex-1 p-5">
        {isLoading && <SkeletonLoader />}
        {!isLoading && !showResults && <DressForm onSubmit={handleSubmit} />}
        {!isLoading && showResults && (
          <DressFormResults suggestions={suggestion} />
        )}
      </main>
      {showResults && <BurgerIcon onClick={handleBurgerClick} />}
      <Footer />
    </div>
  );
};

export default Home;
