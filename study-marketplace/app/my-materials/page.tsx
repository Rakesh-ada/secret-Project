"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/hooks/use-wallet"
import { FileText, Loader2, Lock, Play, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for purchased materials
const MOCK_PURCHASED_MATERIALS = [
  {
    id: "1",
    title: "Advanced Calculus Complete Notes",
    description:
      "Comprehensive notes covering all topics from the Advanced Calculus course including limits, derivatives, integrals, and series.",
    price: "0.05",
    category: "mathematics",
    type: "pdf",
    author: "0x1234...5678",
    purchasedAt: "2024-01-15",
    cid: "QmX7b5jxn6Vd8CgHzTHE2EcnAhkJFpFhVSiCjpTGEfVz1A",
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
    purchasedAt: "2024-02-02",
    cid: "QmY8c7jxm6Vd9DgGzTHE3EcnBhkKGpFhVSiCjpTGEfVz1B",
  },
  {
    id: "3",
    title: "Organic Chemistry Study Guide",
    description: "Detailed study guide for organic chemistry covering reactions, mechanisms, and synthesis strategies.",
    price: "0.03",
    category: "chemistry",
    type: "pdf",
    author: "0x2468...1357",
    purchasedAt: "2024-03-10",
    cid: "QmZ9d7kxn6Vd0CgHzTHE4EcnChkLFpFhVSiCjpTGEfVz1C",
  },
]

export default function MyMaterialsPage() {
  const { address } = useWallet()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [isDecrypting, setIsDecrypting] = useState<string | null>(null)
  const [decryptedMaterials, setDecryptedMaterials] = useState<string[]>([])

  // Filter materials based on active tab
  const filteredMaterials =
    activeTab === "all"
      ? MOCK_PURCHASED_MATERIALS
      : MOCK_PURCHASED_MATERIALS.filter((material) => material.type === activeTab)

  const handleDecrypt = async (materialId: string) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to access your materials",
        variant: "destructive",
      })
      return
    }

    setIsDecrypting(materialId)

    try {
      // Simulate decryption process with Lit Protocol
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setDecryptedMaterials((prev) => [...prev, materialId])

      toast({
        title: "Decryption successful",
        description: "You can now access this material",
      })
    } catch (error) {
      toast({
        title: "Decryption failed",
        description: "There was an error decrypting this material",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsDecrypting(null)
    }
  }

  const isDecrypted = (materialId: string) => decryptedMaterials.includes(materialId)

  if (!address) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6">
            You need to connect your wallet to access your purchased materials
          </p>
          <Button onClick={() => document.dispatchEvent(new CustomEvent("connect-wallet"))}>Connect Wallet</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Materials</h1>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="pdf">Documents</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredMaterials.length === 0 ? (
          <div className="text-center py-12">
            <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No materials found</h3>
            <p className="text-muted-foreground">You haven't purchased any materials yet</p>
            <Button className="mt-4" asChild>
              <a href="/marketplace">Browse Marketplace</a>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {material.type === "pdf" ? <FileText className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      <span className="text-xs font-medium uppercase text-muted-foreground">
                        {material.type === "pdf" ? "Document" : "Video"}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Purchased: {new Date(material.purchasedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle>{material.title}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium capitalize">{material.category.replace("-", " ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Price Paid</p>
                      <p className="font-medium">{material.price} ETH</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {isDecrypted(material.id) ? (
                    <Button className="w-full" variant="outline">
                      {material.type === "pdf" ? (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          View Document
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Play Video
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleDecrypt(material.id)}
                      disabled={isDecrypting === material.id}
                    >
                      {isDecrypting === material.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Decrypting...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Decrypt with Lit Protocol
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

