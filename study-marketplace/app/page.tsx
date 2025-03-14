import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Decentralized Study Material Marketplace</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Upload, sell, and buy study materials securely with blockchain technology and encryption.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Materials
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/marketplace">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Marketplace
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Encryption</CardTitle>
            <CardDescription>Securely share your study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Upload your notes, PDFs, or video lectures. Your content is automatically encrypted using Lit Protocol
              before being stored on IPFS, with the CID recorded on Edu-Chain.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/upload">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>NFT Access Control</CardTitle>
            <CardDescription>ERC-1155 based access rights</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Study materials are minted as ERC-1155 NFTs, allowing multiple users to purchase access. Ownership of the
              NFT grants decryption privileges via Lit Protocol.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/how-it-works">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Materials</CardTitle>
            <CardDescription>Access your purchased content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Once you own an NFT, your wallet gets access to the decryption keys. View your purchased materials
              securely in the "My Materials" section.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/my-materials">View My Materials</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

