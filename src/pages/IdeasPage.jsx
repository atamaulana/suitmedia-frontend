import React, { useEffect, useState } from "react";
import axios from "axios";
import IdeaCard from "../components/IdeaCard";
import CustomPagination from "../components/Pagination";
import Banner from "../components/Banner"; // Import Banner
import { Container, Row, Col, Form } from "react-bootstrap";

const API_URL = "https://suitmedia-backend.suitdev.com/api/ideas";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [meta, setMeta] = useState({});
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [page, setPage] = useState(1);

  // Ambil data API
  const fetchIdeas = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          "page[number]": page,
          "page[size]": perPage,
          append: ["small_image", "medium_image"],
          sort: sort,
        },
      });

      // Tambahkan console.log di sini
      // console.log("API data:", response.data.data);

      // Mapping image seperti controller Laravel
      const mapped = response.data.data.map((item) => {
        let image = null;

        if (item.medium_image && item.medium_image.length > 0) {
          image = item.medium_image[0].url; // ambil langsung URL
        } else if (item.small_image && item.small_image.length > 0) {
          image = item.small_image[0].url; // ambil langsung URL
        } else {
          image = "https://via.placeholder.com/300x200.png?text=No+Image";
        }

        return { ...item, image };
      });

      setIdeas(mapped);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Failed to fetch ideas", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [page, perPage, sort]);

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  return (
    <>
      {/* Banner khusus halaman Ideas */}
      <Banner imageUrl="https://your-cms-image-url.com/banner.jpg" />

      <div className="py-5">
        <Row className="mb-3 align-items-center">
          <Col>
            <div>
              Showing {meta.from ?? 0} - {meta.to ?? 0} of {meta.total ?? 0}
            </div>
          </Col>
          <Col xs="auto">
            <Form.Select value={perPage} onChange={handlePerPageChange}>
              {[10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  Show per page: {num}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Form.Select value={sort} onChange={handleSortChange}>
              <option value="-published_at">Sort by: Newest</option>
              <option value="published_at">Sort by: Oldest</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="g-4 mt-4">
          {ideas.map((idea) => (
            <Col key={idea.id} md={6} lg={3}>
              <IdeaCard idea={idea} />
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <CustomPagination meta={meta} onPageChange={setPage} />
        </div>
      </div>
    </>
  );
}
