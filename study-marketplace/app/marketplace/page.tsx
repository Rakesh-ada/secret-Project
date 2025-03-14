"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/hooks/use-wallet"
import { BookOpen, FileText, Search, Video } from "lucide-react"

// Mock data for study materials
const MOCK_MATERIALS = [
  {
    id: "1",
    title: "Advanced Calculus Complete Notes",
    description:
      "Comprehensive notes covering all topics from the Advanced Calculus course including limits, derivatives, integrals, and series.",
    price: "0.05",
    category: "mathematics",
    type: "pdf",
    author: "0x1234...5678",
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Data Structures & Algorithms Video Lectures",
    description:
      "Complete video course on data structures and algorithms with practical examples and problem-solving techniques.",
    price: "0.08",
    category: "computer-science",
    type: "video",
    author: "0x8765...4321",
    createdAt: "2023-11-02",
  },
  {
    id: "3",
    title: "Organic Chemistry Study Guide",
    description: "Detailed study guide for organic chemistry covering reactions, mechanisms, and synthesis strategies.",
    price: "0.03",
    category: "chemistry",
    type: "pdf",
    author: "0x2468...1357",
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Comprehensive notes on machine learning fundamentals, algorithms, and practical implementations.",
    price: "0.07",
    category: "computer-science",
    type: "pdf",
    author: "0x9876...5432",
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Quantum Physics Video Course",
    description: "In-depth video lectures on quantum physics principles, experiments, and mathematical foundations.",
    price: "0.09",
    category: "physics",
    type: "video",
    author: "0x5432...7890",
    createdAt: "2024-02-18",
  },
  {
    id: "6",
    title: "Financial Accounting Notes",
    description: "Complete notes on financial accounting principles, statements, and analysis techniques.",
    price: "0.04",
    category: "business",
    type: "pdf",
    author: "0x1357...2468",
    createdAt: "2024-03-01",
  },
]

export default function MarketplacePage() {
  const { address } = useWallet()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  // Filter materials based on search and filters
  const filteredMaterials = MOCK_MATERIALS.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "" || material.category === categoryFilter
    const matchesType = typeFilter === "" || material.type === typeFilter

    return matchesSearch && matchesCategory && matchesType
  })

  const handlePurchase = (material: (typeof MOCK_MATERIALS)[0]) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase study materials",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Purchase initiated",
      description: `Purchasing "${material.title}" for ${material.price} ETH`,
    })

    // Simulate purchase process
    setTimeout(() => {
      toast({
        title: "Purchase successful!",
        description: `You now have access to "${material.title}"`,
      })
    }, 2000)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Study Material Marketplace</h1>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for study materials..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="humanities">Humanities</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pdf">Documents</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No materials found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((material) => (
            <Card key={material.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(material.type)}
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      {material.type === "pdf" ? "Document" : "Video"}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(material.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <CardTitle className="line-clamp-1">{material.title}</CardTitle>
                <CardDescription className="line-clamp-2">{material.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium capitalize">{material.category.replace("-", " ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-bold">{material.price} ETH</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handlePurchase(material)}>
                  Purchase Access
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

