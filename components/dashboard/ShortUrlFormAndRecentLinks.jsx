"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShortUrl from "@/server_functions/shortUrl";
import { ExternalLink, Loader2, LucideCopy } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import getRecentLinks from "@/server_functions/getRecentLinks";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ShortUrlFormAndRecentLinks() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNeddedQr, setIsNeddedQr] = useState(false);
  const [isShorted, setIsShorted] = useState(false);
  const [rectLinks, setRectLinks] = useState([]);
  const [loading2, setLoading2] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = alias ? { url, ali: alias } : { url };
    const data = await ShortUrl(payload);
    const parsed = JSON.parse(data);

    if (parsed.alias) {
      const shortUrl = `https://${location.host}/${parsed.alias}`;
      setShortedUrl(shortUrl);
      toast.success("URL shortened successfully!");
      setIsShorted(true);
      setAlias("");
      setUrl("");
    } else if (parsed.message) {
      toast.error(parsed.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchRecentLinks = async () => {
      try {
        const data = await getRecentLinks();
        const parsed = JSON.parse(data);

        // Fix: only set if it's an array
        if (Array.isArray(parsed)) {
          setRectLinks(parsed);
        } else if (Array.isArray(parsed.data)) {
          setRectLinks(parsed.data);
        } else {
          setRectLinks([]);
        }
      } catch (err) {
        console.error(err);
        setRectLinks([]);
      } finally {
        setLoading2(false);
      }
    };

    fetchRecentLinks();
  }, [loading]);

  return (
    <>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="grid gap-3 px-4 py-4 border-border bg-card shadow-sm border rounded-lg"
      >
        <div className="mb-2">
          <h2 className="text-lg">Short Link</h2>
          <p className="text-sm text-muted-foreground">
            Shorten your link in seconds.
          </p>
        </div>

        <Label htmlFor="url">Your URL</Label>
        <Input
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/dfghj.."
          id="url"
        />

        <Label htmlFor="alias">
          Alias{" "}
          <span className="text-xs text-muted-foreground">(optional)</span>
        </Label>
        <Input
          maxLength={10}
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="custom-id"
          id="alias"
        />

        <div className="flex gap-2 items-center mt-1">
          <Checkbox
            id="qrcode"
            onCheckedChange={(e) => setIsNeddedQr(e)}
          />
          <Label htmlFor="qrcode">
            Also generate QR code{" "}
            <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
        </div>

        <Button
          type="submit"
          variant="shine"
          className="mt-3"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Shorten"
          )}
        </Button>

        <AlertDialog open={isShorted}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Link Shortened Successfully</AlertDialogTitle>
              <AlertDialogDescription>
                <p>Copy and share your shortened link:</p>
                <div className="mt-3 grid gap-3">
                  {isNeddedQr && (
                    <div className="grid gap-2">
                      <img
                        className="rounded-lg mx-auto"
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`}
                        alt="qr-code"
                        width={200}
                        height={200}
                      />
                      <Button
                        variant="outline"
                        className="w-fit mx-auto flex items-center gap-2"
                        onClick={() =>
                          window.open(
                            `https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`
                          )
                        }
                      >
                        Open in new tab <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input value={shortedUrl} readOnly />
                    <Button
                      variant="pulse"
                      type="button"
                      size="icon"
                      className="!h-10 !w-12"
                      onClick={() => {
                        navigator.clipboard.writeText(shortedUrl);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <LucideCopy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setIsShorted(false)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              >
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>

      <div className="grid gap-4 px-4 py-4 border-border bg-card shadow-sm border rounded-lg h-fit">
        <div>
          <h2 className="text-lg">Recent Links</h2>
          <p className="text-sm text-muted-foreground">
            List of your recently shortened links.
          </p>
        </div>

        <div className="border border-dashed border-border rounded-lg">
          {loading2 ? (
            <div className="grid place-items-center h-[246px]">
              <Loader2 className="animate-spin h-4 w-5" />
            </div>
          ) : rectLinks.length === 0 ? (
            <div className="grid place-items-center h-[246px]">
              <p className="text-sm text-muted-foreground">No links found.</p>
            </div>
          ) : (
            <div>
              {rectLinks.map((link) => (
                <div
                  key={link.id}
                  className="grid gap-4 p-4 linkList"
                >
                  <Link
                    target="_blank"
                    href={`https://${location.host}/${link.alias}`}
                    className="text-sm flex items-center justify-between w-full opacity-85 hover:underline"
                  >
                    <span>https://{location.host}/{link.alias}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
